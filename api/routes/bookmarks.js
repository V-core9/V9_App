var express = require('express');
var router = express.Router();

/**
 * 
 * @swagger
 * tags:
 *  name: Bookmarks
 *  description: API to manage your Bookmarks.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewBookmark:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The bookmark's name.
 *           example: Leanne Graham
 *     Bookmark:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The bookmark ID.
 *               example: 0
 *         - $ref: '#/components/schemas/NewBookmark'
 */

/**
 * @swagger
 * /bookmarks:
 *   get:
 *     summary: Retrieve a list of bookmarks.
 *     description: Retrieve a list of bookmarks. Can be used to populate a list of fake bookmarks when prototyping or testing an API.
 *     tags: [Bookmarks]
 *     responses:
 *       200:
 *         description: A single Bookmark.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Bookmark'
*/
router.get('/', function (req, res, next) {
  res.send('GETTING LIST OF BOOKMARKS');
});


/**
 * @swagger
 * /bookmarks/{id}:
 *   get:
 *     summary: Get bookmark by ID.
 *     description: Fake response to get bookmark by ID
 *     tags: [Bookmarks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the bookmark to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Get bookmark by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Bookmark'
*/
router.get('/:id', function (req, res, next) {
  res.send('I WILL GET BOOKMARK BY ID:' + req.params.id);
});

/**
 * @swagger
 * /bookmarks:
 *   post:
 *     summary: Create a new bookmark.
 *     description: Fake response to attempt to create a new bookmark
 *     tags: [Bookmarks]
 *     responses:
 *       200:
 *         description: Created new bookmark.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Bookmark'
*/
router.post('/', function (req, res, next) {
  res.send('I WILL CREATE NEW BOOKMARK');
});
/**
 * @swagger
 * /bookmarks:
 *   put:
 *     summary: Update bookmark info.
 *     description: Fake response to attempt to UPDATE bookmark
 *     tags: [Bookmarks]
 *     responses:
 *       200:
 *         description: Created new bookmark.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Bookmark'
*/
router.put('/', function (req, res, next) {
  res.send('I WILL UPDATE BOOKMARK');
});

/**
 * @swagger
 * /bookmarks:
 *   delete:
 *     summary: Delete an existing bookmark.
 *     description: Fake response to attempt to DELETE bookmark
 *     tags: [Bookmarks]
 *     responses:
 *       200:
 *         description: Created new bookmark.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Bookmark'
*/
router.delete('/', function (req, res, next) {
  res.send('I WILL DELETE BOOKMARK');
});



module.exports = router;
