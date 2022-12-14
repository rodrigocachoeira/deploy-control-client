import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { sprint } = req.query;

  console.log(sprint);

  return res.status(200).json({ message: 'John Doe' });
}
