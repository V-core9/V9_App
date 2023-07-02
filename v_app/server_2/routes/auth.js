const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const v_to_sha256 = require('v_to_sha256');
const {
  findUserByEmail,
  createUserByEmailAndPassword,
  findUserById
} = require('../services/users');
const { generateTokens } = require('../utils/jwt');
const {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens
} = require('../services/auth');

const router = express.Router();



/**
 *
 * @swagger
 * tags:
 *  name: Auth
 *  description: API to manage Authorization of the user.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       properties:
 *         refreshToken:
 *           type: string
 *           description: Auth Refresh Token.
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *     NewAuth:
 *       allOf:
 *         - type: object
 *           properties:
 *             accessToken:
 *               type: string
 *               description: Auth Access Token.
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *         - $ref: '#/components/schemas/Auth'
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The Auth Email.
 *           example: slavko.vuletic92@gmail.com
 *         password:
 *           type: string
 *           description: The Auth Password.
 *           example: 0123456789
 *     RevokeToken:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           description: User ID to Revoke Tokens.
 *           example: 89daw19d81wa9
 *     RevokeTokenResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: User by ID Revoked Token.
 *           example: Tokens revoked for user with id 89daw19d81wa9
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user using auth.
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     description: This should register new user and provide new auth tokens for user, basically not requiring authentication though login.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User Register Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/NewAuth'
*/

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('You must provide an email and a password.');
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(400);
      throw new Error('Email already in use.');
    }

    const username = req.body.username || uuidv4();

    const user = await createUserByEmailAndPassword({ email, password, username });

    res.json({
      id: user.id,
      username: user.username,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user using auth.
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     description: Provides fresh Access and Refresh Tokens for user to use.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User Login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/NewAuth'
*/

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('You must provide an email and a password.');
    }

    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      res.status(403);
      throw new Error('Invalid login credentials.');
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      res.status(403);
      throw new Error('Invalid login credentials.');
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
});


/**
 * @swagger
 * /auth/refreshToken:
 *   post:
 *     summary: Refresh user accessToken.
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     description: Provides fresh Access and Refresh Tokens for user to use.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Refresh Token Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/NewAuth'
*/

router.post('/refreshToken', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400);
      throw new Error('Missing refresh token.');
    }
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const savedRefreshToken = await findRefreshTokenById(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const hashedToken = v_to_sha256.sync(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const user = await findUserById(payload.userId);
    if (!user) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    await deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken: newRefreshToken, userId: user.id });

    res.json({
      accessToken,
      refreshToken: newRefreshToken
    });
  } catch (err) {
    next(err);
  }
});




/**
 * @swagger
 * /auth/revokeRefreshTokens:
 *   post:
 *     summary: Revoke User Refresh Token.
 *     requestBody:
 *       description: Well this can basically only be done by **System Administrator**.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RevokeToken'
 *     description: Provides fresh Access and Refresh Tokens for user to use.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Refresh Token Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/RevokeTokenResponse'
*/

// This endpoint is only for demo purpose.
// Move this logic where you need to revoke the tokens( for ex, on password reset)
router.post('/revokeRefreshTokens', async (req, res, next) => {
  try {
    const { userId } = req.body;
    await revokeTokens(userId);
    res.json({ message: `Tokens revoked for user with id #${userId}` });
  } catch (err) {
    next(err);
  }
});


module.exports = router;
