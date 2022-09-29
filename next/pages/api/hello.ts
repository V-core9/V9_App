// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { HelloWord } from '../../types/';

/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */

export default function handler(req: NextApiRequest, res: NextApiResponse<HelloWord>): void {
  res.status(200).json(<HelloWord>{ message: 'Hello World!', timestamp: new Date(), });
}
