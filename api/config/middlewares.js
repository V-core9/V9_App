const compression = require('compression')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const xPoweredByRandom = require('x-powered-by-random')
const helmet = require('helmet')
const cors = require('cors')

const middlewares = [
  {
    handler: morgan,
    args: 'dev',
    exec: true
  },
  {
    handler: helmet,
    exec: true
  },
  {
    handler: cors,
    args: process.env.NODE_ENV === 'development' ? { origin: /http:\/\/localhost:\d+$/ } : undefined,
    exec: true
  },
  {
    handler: express.json,
    exec: true
  },
  {
    handler: express.urlencoded,
    args: { extended: false },
    exec: true
  },
  {
    handler: cookieParser,
    exec: true
  },
  {
    handler: express.static,
    args: path.join(__dirname, 'public'),
    exec: true
  },
  {
    handler: compression,
    exec: true
  },
  {
    handler: xPoweredByRandom
  }
]

module.exports = middlewares
