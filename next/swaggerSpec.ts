const rawInfo = require('package.json');


const swaggerSpec: Object = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: rawInfo.name || 'V-core9.com Next.js API',
      version: rawInfo.version || '1.0.0',
      description: rawInfo.description || 'This is a Next.js REST API documentation using swagger-ui-react.',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: rawInfo.author || { name: 'V-core9', url: 'https://github.com/v-core9', email: 'slavko.vuletic92@gmail.com' },
    },
    servers: [
      {
        url: 'http://localhost:3000/api/',
        description: 'Development server',
      },
      {
        url: 'https://v-core9.com/api/',
        description: 'Production server',
      },
    ],
  },
};

export default swaggerSpec;
module.exports = swaggerSpec;
