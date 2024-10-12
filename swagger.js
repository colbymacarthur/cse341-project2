const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CSE 341 Project 2',
        description: 'API Documentation',
    },
    host: 'https://cse341-project2-782k.onrender.com',
    schemes: [ 'https']
};
    
const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
