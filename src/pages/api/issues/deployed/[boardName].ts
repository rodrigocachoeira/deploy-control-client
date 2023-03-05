import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    data: any
}

export default async function handler(
    req: NextApiRequest,
		res: NextApiResponse<Data>
	) {
  const { boardName } = req.query;

  return res.status(200).json({
    data: [
      'hello world'
    ]
  });
}
