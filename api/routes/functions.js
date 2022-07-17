const express = require('express');
const { isAuthenticated, isAdmin } = require('../middlewares');
const {
  createFunc,
  findById,
  findByName,
  listFunctions,
  runById,
  runByName,
  updateFunction,
  deleteFunction
} = require('../services/functions');

const router = express.Router();


/**
 *
 * @swagger
 * tags:
 *  name: Functions
 *  description: API to manage your Functions.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewFunction:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: Leanne Graham
 *     Function:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The user ID.
 *               example: 0
 *         - $ref: '#/components/schemas/NewFunction'
 */


/**
 * @swagger
 * /functions:
 *   get:
 *     summary: Retrieve a list of System Functions.
 *     description: Retrieve a list of Functions.
 *     tags: [Functions]
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
 *                     $ref: '#/components/schemas/Function'
*/

router.get('/', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    res.json(await listFunctions());
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /functions/{id}:
 *   get:
 *     summary: Get function by ID.
 *     description: A way to load/list a function using its ID.
 *     tags: [Functions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the function to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Function by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Function'
*/
router.get('/:id', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    res.json(await findById(req.params.id));
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /functions:
 *   post:
 *     summary: Create a new System Function.
 *     requestBody:
 *       description: Well this can basically only be done by **System Administrator**.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewFunction'
 *     description: Provides fresh Access and Refresh Tokens for user to use.
 *     tags: [Functions]
 *     responses:
 *       200:
 *         description: Created new function.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Function'
*/

router.post('/', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    req.body.authorId = req.payload.userId;
    req.body.name = req.body.name.replaceAll(' ', '-');
    res.json(await createFunc(req.body));
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /functions/byName/{name}:
 *   get:
 *     summary: Retrieve a list of System Functions.
 *     description: Retrieve a list of Functions.
 *     tags: [Functions]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Numeric ID of the function to retrieve.
 *         schema:
 *           type: string
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
 *                     $ref: '#/components/schemas/Function'
*/
// GET Function By Name
router.get('/byName/:name', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    res.json(await findByName(req.params.name));
  } catch (err) {
    next(err);
  }
});


/**
 * @swagger
 * /functions:
 *   put:
 *     summary: Update a System Function.
 *     requestBody:
 *       description: Well this can basically only be done by **System Administrator**.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewFunction'
 *     description: Provides fresh Access and Refresh Tokens for user to use.
 *     tags: [Functions]
 *     responses:
 *       200:
 *         description: Updated new function.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Function'
*/
// PUT / Update a function
router.put('/', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    res.json(await updateFunction(req.body));
  } catch (err) {
    next(err);
  }
});
/**
 * @swagger
 * /functions/{id}:
 *   put:
 *     summary: Update a System Function.
 *     requestBody:
 *       description: Well this can basically only be done by **System Administrator**.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewFunction'
 *     description: Provides fresh Access and Refresh Tokens for user to use.
 *     tags: [Functions]
 *     responses:
 *       200:
 *         description: Updated new function.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Function'
*/
// PUT / Update a function
router.put('/:id', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    res.json(await updateFunction({ id: req.params.id, ...req.body }));
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /functions/:
 *   delete:
 *     summary: Delete a System Function.
 *     requestBody:
 *       description: Well this can basically only be done by **System Administrator**.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Function'
 *     description: Provides fresh Access and Refresh Tokens for user to use.
 *     tags: [Functions]
 *     responses:
 *       200:
 *         description: Updated new function.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Function'
*/
/**
 * @swagger
 * /functions/{id}:
 *   delete:
 *     summary: Delete a System Function.
 *     requestBody:
 *       description: Well this can basically only be done by **System Administrator**.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewFunction'
 *     description: Provides fresh Access and Refresh Tokens for user to use.
 *     tags: [Functions]
 *     responses:
 *       200:
 *         description: Updated new function.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Function'
*/
// DELETE / Remove a function
router.delete('/:id?', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    res.json(await deleteFunction((req.params.id === undefined) ? req.body.id : req.params.id));
  } catch (err) {
    next(err);
  }
});


/**
 * @swagger
 * /functions/run/:
 *   post:
 *     summary: RUN System Function.
 *     requestBody:
 *       description: Well this can basically only be done by **System Administrator**.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewFunction'
 *     description: Provides fresh Access and Refresh Tokens for user to use.
 *     tags: [Functions]
 *     responses:
 *       200:
 *         description: Run function.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Function'
*/
// RUN Function
router.post('/run', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    if (!req.body.id) {
      res.json(await runByName({ name: req.body.name, args: req.body.args }));
    } else {
      res.json(await runById({ id: req.body.id, args: req.body.args }));
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /functions/run/byId/{id}:
 *   post:
 *     summary: RUN System Function by Id.
 *     requestBody:
 *       description: Well this can basically only be done by **System Administrator**.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewFunction'
 *     description: Provides fresh Access and Refresh Tokens for user to use.
 *     tags: [Functions]
 *     responses:
 *       200:
 *         description: Run function.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Function'
*/
// RUN Function byId
router.post('/run/byId/:id', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    res.json(await runById({ id: req.params.id, args: req.body }));
  } catch (err) {
    next(err);
  }
});


/**
 * @swagger
 * /functions/run/byName/{name}:
 *   post:
 *     summary: RUN System Function by Name.
 *     requestBody:
 *       description: Well this can basically only be done by **System Administrator**.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewFunction'
 *     description: Provides fresh Access and Refresh Tokens for user to use.
 *     tags: [Functions]
 *     responses:
 *       200:
 *         description: Run function.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Function'
*/
// RUN Function byName
router.post('/run/byName/:name', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    res.json(await runByName({ name: req.params.name, args: req.body }));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
