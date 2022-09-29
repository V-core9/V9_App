// const bcrypt = require('bcrypt');
const { db } = require('../utils/db');

function findBookByTitle(title) {
  return db.user.findUnique({
    where: {
      title,
    },
  });
}

function createBook(book) {
  return db.book.create({
    data: book,
  });
}

function findBookById(id) {
  return db.book.findUnique({
    where: {
      id,
    },
  });
}

function listBooks(query = {}) {
  return db.book.findMany({
    where: {
      title: {
        contains: query.q || undefined
      },
    }
  });
}

function updateBook(data) {
  return db.book.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      description: data.description,
      content: data.content,
    }
  });
}

function deleteBook(bookId) {
  return db.book.delete({
    where: {
      id: bookId,
    },
  });
}

function listByAuthorId(authorId) {
  return db.book.findMany({
    where: {
      authorId,
    },
  });
}

module.exports = {
  listBooks,
  findBookByTitle,
  findBookById,
  updateBook,
  createBook,
  deleteBook,
  listByAuthorId
};
