// Types and Interfaces
import type { AuthService } from '..';

// Loading of things
const { db } = require('../utils/db');
const v_to_sha256 = require('v_to_sha256');


const authService: AuthService = {

  addRefreshTokenToWhitelist({ jti, refreshToken, userId }) {
    return db.refreshToken.create({
      data: {
        id: jti,
        hashedToken: v_to_sha256.sync(refreshToken),
        userId
      },
    });
  },

  findRefreshTokenById(id) {
    return db.refreshToken.findUnique({
      where: {
        id,
      },
    });
  },

  deleteRefreshToken(id) {
    return db.refreshToken.update({
      where: {
        id,
      },
      data: {
        revoked: true
      }
    });
  },

  revokeTokens(userId) {
    return db.refreshToken.updateMany({
      where: {
        userId
      },
      data: {
        revoked: true
      }
    });
  }

};

module.exports = authService;

export default authService;
