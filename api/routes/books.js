const express = require('express');

const { isAuthenticated } = require('../middlewares');

const {
  createBook,
  findBookById,
  listBooks,
  updateBook,
  deleteBook,
  listByAuthorId,
} = require('../services/books');

const router = express.Router();

router.get('/me', isAuthenticated, async (req, res, next) => {
  try {
    if (req.payload.userId !== undefined) {
      res.json(await listByAuthorId(req.payload.userId));
    } else {
      res.json(await listBooks());
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:id?', isAuthenticated, async (req, res, next) => {
  try {
    if (req.params.id !== undefined) {
      res.json(await findBookById(req.params.id));
    } else {
      res.json(await listBooks());
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    req.body.authorId = req.payload.userId;
    res.json(await createBook(req.body));
  } catch (err) {
    next(err);
  }
});

router.put('/:id?', isAuthenticated, async (req, res, next) => {
  try {
    req.body.id = (req.params.id === undefined) ? req.body.id : req.params.id;
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

router.delete('/', isAuthenticated, async (req, res, next) => {
  try {
    const book = await findBookById(req.body.id);
    if (book.authorId === req.payload.userId) {
      res.json(await deleteBook(req.body.id));
    } else {
      res.status(401).json({ message: 'You are not authorized to delete this book' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
