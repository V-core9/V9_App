
const { db } = require('../utils/db');

const functionTestService = {

  createFuncTest(data) {
    return db.functionTest.create({ data });
  }

};

module.exports = functionTestService;
module.exports.default = functionTestService;
