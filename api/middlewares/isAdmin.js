module.exports = function isAdmin(req, res, next) {
  console.log(req.payload);
  if (req.payload.isAdmin === true) {
    next();
  } else {
    res.status(403);
    throw new Error('🚫 Forbidden 🚫');
  }
};
