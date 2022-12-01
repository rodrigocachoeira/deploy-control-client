import type { NextApiRequest, NextApiResponse } from 'next'

import { deleteBoard } from "../../../models/board";
import { isValidMethod } from "../../../helpers/request";

type Data = {
    message: string;
}

export default async function handler(
        req: NextApiRequest,
		res: NextApiResponse<Data>
        ) {
    if (! isValidMethod(req, res, 'DELETE')) return;

	const { id } = req.body;

    await deleteBoard(id);

    return res.status(200).json({
		message: "Board deleted.",
	});
}
