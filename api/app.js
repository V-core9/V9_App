const createError = require('http-errors');
const compression = require('compression')
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const xPoweredByRandom = require('x-powered-by-random');
const helmet = require('helmet');
const cors = require('cors');

const { notFound, errorHandler } = require('./middlewares');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const bookmarksRouter = require('./routes/bookmarks');
const booksRouter = require('./routes/books');
const functionsRouter = require('./routes/functions');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
app.use(xPoweredByRandom);

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/bookmarks', bookmarksRouter);
app.use('/functions', functionsRouter);

if (process.env.NODE_ENV === 'development') {
  const swaggerUi = require('swagger-ui-express');
  const swaggerSpec = require('./swaggerSpec');
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

app.use(notFound);
app.use(errorHandler);

module.exports = app;

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

