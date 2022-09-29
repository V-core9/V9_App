// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { ApiInfo } from '../../types/';

const npmInfoRaw = require('../../package.json');


/**
 * @swagger
 * /api:
 *   get:
 *     description: Returns information about application like version, author, description...etc.
 *     responses:
 *       200:
 *         description: Object with name, version, author, description, keywords.
 */

export default function handler(req: NextApiRequest, res: NextApiResponse<ApiInfo>): void {

  res.status(200).json(<ApiInfo>{
    name: npmInfoRaw.name,
    version: npmInfoRaw.version,
    description: npmInfoRaw.description,
    keywords: npmInfoRaw.keywords,
    author: npmInfoRaw.author,
  });

}
