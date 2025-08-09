const { notFound, errorHandler } = require('../middlewares')

const errorMiddlewares = [
  //? Error 404: Not Found Page
  //* Note: Creates 404 error using `http-errors` then it passes on to
  //* errorHandler so it will respond with JSON.
  {
    handler: notFound
  },

  //? General Error Handler Page
  //* Handles responding with JSON after an error occured.
  //* Additionally will include error stack when running in development mode
  // NOTE: SHOULD BE LAST TO HANDLE ANY ERROR WITH RESPONSE
  {
    handler: errorHandler
  }
]

module.exports = errorMiddlewares
