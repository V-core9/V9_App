// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { revokeTokens } from '../../../services/auth';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { userId } = req.body;
        await revokeTokens(userId);
        res.json({ message: `Tokens revoked for user with id #${userId}` });
      } catch (err) {
        next(err);
      }
      res.status(200).json({ name: 'John Doe' });
      break;

    default:
      res.status(400).json({ message: 'Invalid method, only POST is allowed.' });
      break;
  }
}
