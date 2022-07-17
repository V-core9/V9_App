const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'V-core9.com Express API',
        version: '1.0.0',
        description:
            'This is a REST API application made with Express. It retrieves data from nowhere for now.',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'V-core9',
            url: 'https://github.com/v-core9',
        },
    },
    servers: [
        {
            url: `http://localhost/api/`,
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    // Path to the API docs
    apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;