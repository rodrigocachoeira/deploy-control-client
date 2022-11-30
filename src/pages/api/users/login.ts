import { NextApiRequest, NextApiResponse } from "next";

import { login } from '../../../models/user';
import { isValidMethod } from "../../../helpers/request";
import { createJwtToken } from "../../../lib/jwt";

type Data = {
    message: string;
    token?: string | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (! isValidMethod(req, res, 'POST')) return;

	const { email, password } = req.body;
	const user = await login({
		email: email as string,
		password: password as string
    });

    if (! user) {
        res.status(401).json({
			message: 'Wrong user or password'
		});

        return;
    }

	res.status(200).json({
		message: 'Successfully Login',
		token: createJwtToken({
			id: user.id as number,
			email: user.email
        })
    })
}