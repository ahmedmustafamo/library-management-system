// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Library Management System',
        description: 'A Library Management System',
    },
    host: process.env.DEFAULT_DOMAIN,
    // because i'm working on codespace, if you'll run it lically you need to make it just 'http'
    schemes: ['https'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./../server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger output file generated successfully');
    require('./../server');
});
