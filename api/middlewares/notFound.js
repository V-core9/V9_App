const createError = require('http-errors')

const notFound = async (req, res, next) => {
  next(createError(404))
}

module.exports = notFound
