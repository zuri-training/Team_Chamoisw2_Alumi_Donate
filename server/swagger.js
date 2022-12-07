const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    version: '1.0.0',
    title: 'ALUMNI DONATE',
    description: "",
  },
  host: 'localhost:5000',
  schemes: ['http','https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header',
    },
  },

}

const outputFile = './swagger_output.json'
const endpointsFiles = [
  './index.js',
]

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('../server/index')
})