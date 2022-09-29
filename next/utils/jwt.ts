import type { AuthJwtResponse, UserType } from '..';
const jwt = require('jsonwebtoken');

function generateAccessToken(user: UserType): string {
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

function generateRefreshToken(user: UserType, jti: any): string {
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

function generateTokens(user: UserType, jti: any): AuthJwtResponse {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

const jwtFunctions: any = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
};

module.exports = jwtFunctions;
export default jwtFunctions;
