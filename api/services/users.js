const bcrypt = require('bcrypt');

const { db } = require('../utils/db');

function findUserByEmail(email) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

function createUserByEmailAndPassword(user) {
  user.password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
}

function findUserById(id) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

function listUsers() {
  return db.user.findMany();
}

function updateUser(data) {
  if (data.password !== undefined) delete data.password;
  return db.user.update({
    where: {
      id: data.id,
    },
    data: {
      email: data.email,
      isAdmin: data.isAdmin,
    }
  });
}

module.exports = {
  listUsers,
  findUserByEmail,
  findUserById,
  updateUser,
  createUserByEmailAndPassword
};
