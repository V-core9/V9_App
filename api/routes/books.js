const router = require('express').Router();

const { isAuthenticated } = require('../middlewares');

const {
  createBook,
  findBookById,
  listBooks,
  updateBook,
  deleteBook,
  listByAuthorId,
} = require('../services/books');

/**
 *
 * @swagger
 * tags:
 *  name: Books
 *  description: API to manage your Books.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewBook:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The book's title.
 *           example: Example Book Name
 *         description:
 *           type: string
 *           description: The book's description.
 *           example: This books does it all. Yea some space-holder text.
 *         content:
 *           type: string
 *           description: The book's actual content.
 *           example: This books does it all. Yea some space-holder text.
 *     Book:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The book ID.
 *               example: nd2asi3dnp3sad2pon4a5pso4n2d
 *         - $ref: '#/components/schemas/NewBook'
 *     DeleteBook:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The book's ID.
 *           example: nd2asi3dnp3sad2pon4a5pso4n2d
 */

//* Get List of Books
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of books.
 *     description: Retrieve a list of books. Array of books with data.
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A List of Books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
*/
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    res.json(await listBooks());
  } catch (err) {
    next(err);
  }
});
//! Get List of Books

//* Get book by ID
/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get book by ID.
 *     description: Retrieve a book data.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the book to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Get book by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
*/
router.get('/:id', isAuthenticated, async (req, res, next) => {
  try {
    res.json(await findBookById(req.params.id));
  } catch (err) {
    next(err);
  }
});
//! Get book by ID

//* Create a new book using request body data.
/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create New Book.
 *     description: Retrieve a book data.
 *     tags: [Books]
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewBook'
 *     responses:
 *       200:
 *         description: Created Book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
*/
router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    req.body.authorId = req.payload.userId;
    res.json(await createBook(req.body));
  } catch (err) {
    next(err);
  }
});
//! Create a new book using request body data.

//* Update using Request Body Data
/**
 * @swagger
 * /books:
 *   put:
 *     summary: Update a book.
 *     description: Retrieve a book data.
 *     tags: [Books]
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Updated Book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
*/
router.put('/', isAuthenticated, async (req, res, next) => {
  try {
    const book = await findBookById(req.body.id);
    if (book.authorId === req.payload.userId) {
      res.json(await updateBook(req.body));
    } else {
      res.status(403).json({
        message: 'You are not authorized to update this book',
      });
    }
  } catch (err) {
    next(err);
  }
});
//! Update using Request Body Data

//* Update using the request params Id
/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update book by ID.
 *     description: Retrieve a book data.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the book to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewBook'
 *     responses:
 *       200:
 *         description: Update book by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
*/
router.put('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const book = await findBookById(req.params.id);
    if (book.authorId === req.payload.userId) {
      res.json(await updateBook(req.body));
    } else {
      res.status(403).json({
        message: 'You are not authorized to update this book',
      });
    }
  } catch (err) {
    next(err);
  }
});
//! Update using the request params Id

//* Delete a book using request body data.
/**
 * @swagger
 * /books:
 *   delete:
 *     summary: Delete book by ID.
 *     description: Retrieve a book data.
 *     tags: [Books]
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteBook'
 *     responses:
 *       200:
 *         description: Delete book by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
*/
router.delete('/', isAuthenticated, async (req, res, next) => {
  try {
    const book = await findBookById(req.body.id);
    if (book.authorId === req.payload.userId) {
      res.json(await deleteBook(book.id));
    } else {
      res.status(401).json({ message: 'You can only delete the books you own.' });
    }
  } catch (err) {
    next(err);
  }
});
//! Delete a book using request body data.

//* Delete using the request params ID.
/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete book by ID.
 *     description: Retrieve a book data.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the book to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Delete book by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
*/
router.delete('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const book = await findBookById(req.params.id);
    if (book.authorId === req.payload.userId) {
      res.json(await deleteBook(book.id));
    } else {
      res.status(401).json({ message: 'You can only delete the books you own.' });
    }
  } catch (err) {
    next(err);
  }
});
//! Delete using the request params ID.

//* Get My Books
/**
 * @swagger
 * /books/me:
 *   get:
 *     summary: List of owned books.
 *     description: List of books owned by the authorized user.
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of your books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
*/
router.get('/me', isAuthenticated, async (req, res, next) => {
  try {
    res.json(await listByAuthorId(req.payload.userId));
  } catch (err) {
    next(err);
  }
});
//! Get My Books

module.exports = router;
