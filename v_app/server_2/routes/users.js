const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();

const { isAuthenticated, isAdmin } = require('../middlewares');
const {
  findUserByEmail,
  createUserByEmailAndPassword,
  findUserById,
  listUsers,
  updateUser
} = require('../services/users');

/**
 *
 * @swagger
 * tags:
 *  name: Users
 *  description: API to manage your Users.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: Leanne Graham
 *     User:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The user ID.
 *               example: 0
 *         - $ref: '#/components/schemas/NewUser'
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users.
 *     description: Retrieve a list of users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A single User.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
*/
router.get('/', async (req, res, next) => {
  try {
    res.json(await listUsers());
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID.
 *     description: Fake response to get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Get user by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
*/
router.get('/:id', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    res.json(await findUserById(req.params.id));
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user.
 *     description: Fake response to attempt to create a new user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Created new user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
*/
router.post('/', isAuthenticated, isAdmin, async (req, res, next) => {
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
 * /users:
 *   put:
 *     summary: Update user info.
 *     description: Fake response to attempt to UPDATE user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Created new user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
*/

router.put('/', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    res.json(await updateUser(req.body));
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Delete an existing user.
 *     description: Fake response to attempt to DELETE user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Created new user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
*/

router.delete('/', async (req, res, next) => {
  res.send('I WILL DELETE USER');
});

module.exports = router;
