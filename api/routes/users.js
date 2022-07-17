const { isAuthenticated, isAdmin } = require('../middlewares');
const { findUserById, listUsers, updateUser } = require('../services/users');

var express = require('express');
var router = express.Router();


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
 *     description: Retrieve a list of users. Can be used to populate a list of fake users when prototyping or testing an API.
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
router.post('/', async (req, res, next) => {
  res.send('I WILL CREATE NEW USER');
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
