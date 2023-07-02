const { db } = require('../utils/db');

function createFuncTest(data) {
  return db.functionTest.create({ data });
}

module.exports = {
  createFuncTest
};
