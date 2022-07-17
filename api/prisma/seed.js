const { createUserByEmailAndPassword } = require('../services/users');
const { createFunc } = require('../services/functions');

const log = (...args) => console.log(...args);

(async () => {
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
})();
