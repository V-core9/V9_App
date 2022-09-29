
const swaggerSpec = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'V-core9.com Express API',
      version: '1.0.0',
      description: 'This is a Next.js REST API documentation using swagger-ui-react.',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'V-core9',
        url: 'https://github.com/v-core9',
        email: 'slavko.vuletic92@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost/api/',
        description: 'Development server',
      },
    ],
  },
};

export default swaggerSpec;
