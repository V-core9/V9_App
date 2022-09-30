const { db } = require('../utils/db');
const { createUserByEmailAndPassword } = require('../services/users');
const { createFunc } = require('../services/functions');
const { createFuncTest } = require('../services/functionTests');

const log = (...args) => console.log(...args);

(async () => {
  console.log('Prisma Types', Object.keys(db));

  const seedAdmin = await createUserByEmailAndPassword({ username: 'SlavkoV', email: 'slavko.vuletic92@gmail.com', password: '0123456789', isAdmin: true });

  log('Seed Admin User', seedAdmin);

  // Custom Functions
  const getPI = {
    name: 'getPI',
    description: 'Returns value of PI ( 22/7 )',
    content: 'return (22/7);\n',
    authorId: seedAdmin.id,
  };

  const calcArea = {
    name: 'calcArea',
    description: 'Demo deconstructing of variables from input and calculate area.',
    content: 'const { width, height } = args;\nreturn width * height;\n',
    authorId: seedAdmin.id,
  };

  const getProcessEnv = {
    name: 'getProcessEnv',
    description: 'Returns Process Environment Object',
    content: 'return process.env;\n',
    authorId: seedAdmin.id,
  };

  const seedFunctions = {
    getPI: await createFunc(getPI),
    calcArea: await createFunc(calcArea),
    getProcessEnv: await createFunc(getProcessEnv),
  };

  log('Seeded AppFunctions', seedFunctions);

  const funcTests = {
    getPI: await createFuncTest({
      description: 'Post Empty [args] and get 22/7 float',
      args: '{}',
      expect: '22/7',
      functionId: seedFunctions.getPI.id
    }),
  };

  log('Seeded AppFunctionsTests', funcTests);
})();
