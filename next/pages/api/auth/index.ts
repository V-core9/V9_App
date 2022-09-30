import type { NextApiRequest, NextApiResponse } from 'next'
/**
 *
 * @swagger
 * tags:
 *  name: Auth
 *  description: API to manage Authorization of the user.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       properties:
 *         refreshToken:
 *           type: string
 *           description: Auth Refresh Token.
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *     NewAuth:
 *       allOf:
 *         - type: object
 *           properties:
 *             accessToken:
 *               type: string
 *               description: Auth Access Token.
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *         - $ref: '#/components/schemas/Auth'
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The Auth Email.
 *           example: slavko.vuletic92@gmail.com
 *         password:
 *           type: string
 *           description: The Auth Password.
 *           example: 0123456789
 *     RevokeToken:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           description: User ID to Revoke Tokens.
 *           example: 89daw19d81wa9
 *     RevokeTokenResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: User by ID Revoked Token.
 *           example: Tokens revoked for user with id 89daw19d81wa9
 */


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(403).json(<any>{ message: 'Invalid API method' });
  return;
}
