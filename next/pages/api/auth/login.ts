// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { UserLoginType, AuthJwtResponse, RefreshWhitelistTokenType } from '../../..';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const { findUserByEmail } = require('../../../services/users');
const { addRefreshTokenToWhitelist } = require('../../../services/auth');

const { generateTokens } = require('../../../utils/jwt');


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user using auth.
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     description: Provides fresh Access and Refresh Tokens for user to use.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User Login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/NewAuth'
*/


export default async function handler(req: NextApiRequest, res: NextApiResponse<AuthJwtResponse>) {

  //! Must be a [POST] Method
  if (req.method !== 'POST') {
    res.status(403).json(<any>{ message: 'Invalid API method' });
    return;
  }

  const { email, password } = <UserLoginType>req.body;

  if (!email || !password) {
    res.status(400).json(<any>{ message: 'You must provide an email and a password.' });
    return;
  }

  const existingUser: any = <any>(await findUserByEmail(email));

  if (!existingUser) {
    res.status(403).json(<any>{ message: 'Invalid login credentials.' });
    return;
  }

  const validPassword: boolean = await bcrypt.compare(password, existingUser.password) || false;

  if (!validPassword) {
    res.status(403).json(<any>{ message: 'Invalid login credentials.' });
    return;
  }

  const jti = <string>uuidv4();

  const jwtTokens = <AuthJwtResponse>generateTokens(existingUser, jti);
  await addRefreshTokenToWhitelist(<RefreshWhitelistTokenType>{ jti, refreshToken: jwtTokens.refreshToken, userId: existingUser.id });

  res.status(200).json(<AuthJwtResponse>{ ...jwtTokens });
  return;
}
