// Types and Interfaces
import type { UserService } from '..';

// Loading of things
const bcrypt = require('bcrypt');
const { db } = require('../utils/db');

const usersService: UserService = {

  listUsers: () => db.user.findMany(),

  findUserByEmail: (email) => {
    return db.user.findUnique({
      where: {
        email,
      },
    });
  },

  findUserById: (id) => {
    return db.user.findUnique({
      where: {
        id,
      },
    });
  },

  updateUser: (data) => {
    //if (data.password !== undefined) delete data.password;
    return db.user.update({
      where: {
        id: data.id,
      },
      data: {
        email: data.email,
        isAdmin: data.isAdmin,
      }
    });
  },

  createUserByEmailAndPassword: (user) => {
    user.password = bcrypt.hashSync(user.password, 12);
    return db.user.create({
      data: user,
    });
  }

};


module.exports = usersService;
//export default usersService;
