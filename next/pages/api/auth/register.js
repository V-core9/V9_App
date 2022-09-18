// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { uuid as uuidv4 } from 'uuidv4';

import { createUserByEmailAndPassword, findUserByEmail } from '../../../services/users';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'You must provide an email and a password.' });
  }

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    res.status(400).json({ message: 'Email already in use.' });
  }

  const username = req.body.username || uuidv4();

  const user = await createUserByEmailAndPassword({ email, password, username });

  res.status(200).json({
    id: user.id,
    username: user.username,
  });

}
