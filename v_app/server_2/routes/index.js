const router = require('express').Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    res.json(
      {
        title: 'Express API Title',
        mode: process.env.NODE_ENV || 'production',
        timestamp: new Date(),
      },
      false,
      2
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;
