// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createUserByEmailAndPassword } from '../../../services/users';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400);
        throw new Error('You must provide an email and a password.');
      }

      const existingUser = await findUserByEmail(email);

      if (existingUser) {
        res.status(400);
        throw new Error('Email already in use.');
      }

      const username = req.body.username || uuidv4();

      const user = await createUserByEmailAndPassword({ email, password, username });

      res.status(200).json({
        id: user.id,
        username: user.username,
      });
      break;

    default:
      res.status(400).json({ message: 'Invalid method, only POST is allowed.' });
      break;
  }
}
