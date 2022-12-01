import type { NextApiRequest, NextApiResponse } from 'next'

import { createUser } from "../../../models/user";
import {isValidMethod} from "../../../helpers/request";

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
	if (! isValidMethod(req, res, 'POST')) return;

  	const { email, password } = req.body;

	createUser({
	  email: email,
	  password: password
	});

  	return res.status(200).json({
  		message: "User created."
	});
}
