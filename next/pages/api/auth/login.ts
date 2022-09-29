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
 *     description: Attempts to login a user with provided data.
 *     responses:
 *       200:
 *         description: Login Successful.
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse<AuthJwtResponse>) {

  if (req.method !== 'POST') {
    res.status(403).json(<any>{ message: 'Invalid API method' });
    return;
  }

  const { email, password } = req.body;

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
