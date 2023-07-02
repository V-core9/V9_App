const createError = require('http-errors');
const compression = require('compression');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const xPoweredByRandom = require('x-powered-by-random');
const helmet = require('helmet');
const cors = require('cors');

const debug = require('debug')('api:server');

//! Socket.io
const http = require('http');
const { Server } = require('socket.io');
const { createWsEventsHandlers } = require('./socket/createWsEventsHandlers');
//! io eof

const { notFound, errorHandler } = require('./middlewares');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const bookmarksRouter = require('./routes/bookmarks');
const booksRouter = require('./routes/books');
const functionsRouter = require('./routes/functions');
const developersRouter = require('./routes/developers');

const app = express();

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(morgan('dev'));
// app.use(helmet());
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(compression());
// app.use(xPoweredByRandom);

//! Socket.io
const server = http.createServer(app); // Add this
// Create an io server and allow for CORS from http://localhost:5757 with GET and POST methods
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5757',
    methods: ['GET', 'POST'],
  },
});

// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);
  // eslint-disable-next-line max-len
  createWsEventsHandlers(io, socket).forEach((item) => socket.on(item.eventName, item.method));
});
//! io eof

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/bookmarks', bookmarksRouter);
app.use('/functions', functionsRouter);
app.use('/developers', developersRouter);

/*
if (process.env.NODE_ENV === 'development') {
  const swaggerUi = require('swagger-ui-express');
  const swaggerSpec = require('./swaggerSpec');
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
*/

app.use(notFound);
app.use(errorHandler);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// catch 404 and forward to error handler
// app.use(async (req, res, next) => {
//   next(createError(404));
// });

// // error handler
// app.use(async (err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
