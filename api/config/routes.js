const indexRouter = require('../routes/index')
const authRouter = require('../routes/auth')
const usersRouter = require('../routes/users')
const bookmarksRouter = require('../routes/bookmarks')
const booksRouter = require('../routes/books')
const functionsRouter = require('../routes/functions')
const developersRouter = require('../routes/developers')

const routes = [
  {
    path: '/',
    handlers: [indexRouter]
  },
  {
    path: '/auth',
    handlers: [authRouter]
  },
  {
    path: '/users',
    handlers: [usersRouter]
  },
  {
    path: '/books',
    handlers: [booksRouter]
  },
  {
    path: '/bookmarks',
    handlers: [bookmarksRouter]
  },
  {
    path: '/functions',
    handlers: [functionsRouter]
  },
  {
    path: '/developers',
    handlers: [developersRouter]
  }
]

// Swagger Documentation Page
if (process.env.NODE_ENV === 'development') {
  const swaggerUi = require('swagger-ui-express')
  const swaggerSpec = require('./swaggerSpec')
  // app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  const swaggerDocs = {
    path: '/docs',
    handlers: [swaggerUi.serve, swaggerUi.setup(swaggerSpec)]
  }

  routes.push(swaggerDocs)
}

module.exports = routes
