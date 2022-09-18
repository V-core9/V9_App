// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    title: 'NEXT API Title',
    mode: process.env.NODE_ENV || 'production',
    timestamp: new Date(),
  });
}
