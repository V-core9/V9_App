// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      res.status(200).json({ name: 'John Doe' });
      break;

    default:
      res.status(400).json({ message: 'Invalid method, only POST is allowed.' });
      break;
  }
}
