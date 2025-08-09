const express = require('express')
const path = require('path')

const { routes, middlewares, errorMiddlewares } = require('./config')

const app = express()

// Middleware loop function
const mwHandler = (mw) => app.use(mw?.exec ? mw.handler(mw?.args || undefined) : mw.handler)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//? Middlewares in order from Array of handler(args)
middlewares.forEach(mwHandler)

//? API Routes adding
routes.forEach(({ path, handlers }) => app.use(path, handlers))

//? Error Middlewares for the end to handle things
errorMiddlewares.forEach(mwHandler)

module.exports = app
