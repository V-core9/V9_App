const router = require('express').Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const rootApiPage = {
    title: 'Express',
    apiMode: process.env.NODE_ENV || 'production',
  };
  res.render('index', rootApiPage);
});

module.exports = router;
