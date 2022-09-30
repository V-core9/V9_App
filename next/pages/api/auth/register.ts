// Types and Interfaces
import type { NextApiRequest, NextApiResponse } from 'next';
import type { UserBase, NewUser } from '../../../';

// Loading of things
const { v4: uuidv4 } = require('uuid');
const { findUserByEmail, createUserByEmailAndPassword } = require('../../../services/users');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user using auth.
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     description: This should register new user and provide new auth tokens for user, basically not requiring authentication though login.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User Register Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/NewAuth'
*/

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  //! Must be a [POST] Method
  if (req.method !== 'POST') {
    res.status(403).json(<any>{ message: 'Invalid API method' });
    return;
  }

  const { email, password } = <Partial<UserBase>>req.body;

  if (!email || !password) {
    res.status(400).json(<any>{ message: 'You must provide an email and a password.' });
    return;
  }

  if (await findUserByEmail(email)) {
    res.status(400).json(<any>{ message: 'Email already in use.' });
    return;
  }

  const username = req.body.username || uuidv4();

  const user: UserBase = await createUserByEmailAndPassword(<NewUser>{ email, password, username });

  res.status(200).json({
    id: user.id,
    username: user.username,
  });

};
