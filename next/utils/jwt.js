const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      username: user.username,
      isAdmin: user.isAdmin
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: '10m',
    }
  );
}

function generateRefreshToken(user, jti) {
  return jwt.sign(
    {
      userId: user.id,
      isAdmin: user.isAdmin,
      username: user.username,
      jti
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: '6h',
    }
  );
}

function generateTokens(user, jti) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

const jwtFunctions = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
};

module.exports = jwtFunctions;
export default jwtFunctions;
