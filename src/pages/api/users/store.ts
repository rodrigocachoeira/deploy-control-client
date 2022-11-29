import type { NextApiRequest, NextApiResponse } from 'next'

import { createUser } from "../../../models/user";

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
        message: 'Method not allowed'
    });
  }

  const { email, password } = req.body;

  createUser({
    email: email,
    password: password
  });

  return res.status(200).json({ message: 'John Doe' });
}
