// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { findUserByEmail } = require('../../../services/users');
const { generateTokens } = require('../../../utils/jwt');
const { addRefreshTokenToWhitelist } = require('../../../services/auth');

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'You must provide an email and a password.' });
    return;
  }

  const existingUser = await findUserByEmail(email);

  if (!existingUser) {
    res.status(403).json({ message: 'Invalid login credentials.' });
    return;
  }

  const validPassword = await bcrypt.compare(password, existingUser.password);
  if (!validPassword) {
    res.status(403).json({ message: 'Invalid login credentials.' });
    return;
  }

  const jti = uuidv4();
  const { accessToken, refreshToken } = generateTokens(existingUser, jti);
  await addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id });

  res.status(200).json({ accessToken, refreshToken });
  return;
}
