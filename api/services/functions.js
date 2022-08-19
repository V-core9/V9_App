const path = require('path');
const fs = require('fs');
const { db } = require('../utils/db');

const tempFileName = 'tempFileName';
const tempFilePath = path.join(__dirname, `${tempFileName}.js`);

function createFunc(data) {
  return db.function.create({ data });
}

function updateFunction(func) {
  return db.function.update({
    where: {
      id: func.id,
    },
    data: {
      name: func.name,
      content: func.content,
    }
  });
}

function deleteFunction(id) {
  return db.function.delete({
    where: {
      id,
    }
  });
}

function findById(id) {
  return db.function.findUnique({
    where: {
      id,
    },
    include: {
      FunctionTest: true,
    }
  });
}

function findByName(name) {
  return db.function.findUnique({
    where: {
      name,
    },
  });
}

function listFunctions() {
  return db.function.findMany();
}

function runIt(func, args) {
  const response = {
    output: null,
    execTime: Date.now(),
  };

  try {
    // Create a file that exports function with func.content
    fs.writeFileSync(tempFilePath, `module.exports = (args) => {${func.content}}`);
    // Require & Trigger Function from a file
    response.output = require(`./${tempFileName}`)(args);
    // Delete cached require module
    delete require.cache[require.resolve(`./${tempFileName}`)];
    // Remove the temporary file
    fs.unlinkSync(tempFilePath);
  } catch (error) {
    response.output = error;
  }

  response.execTime = Date.now() - response.execTime;

  return response;
}

async function runByName(data) {
  const rez = await db.function.findFirst({
    where: {
      name: data.name
    }
  });

  return runIt(rez, data.args);
}

async function runById(data) {
  const rez = await db.function.findUnique({
    where: {
      id: data.id
    }
  });

  return runIt(rez, data.args);
}

module.exports = {
  findById,
  listFunctions,
  findByName,
  createFunc,
  runByName,
  runById,
  updateFunction,
  deleteFunction
};
