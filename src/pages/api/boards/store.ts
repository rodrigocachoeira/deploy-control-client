import type { NextApiRequest, NextApiResponse } from 'next'

import { createOrUpdateBoard } from "../../../models/board";
import { isValidMethod } from "../../../helpers/request";

type Data = {
    message: string;
    data: any;
}

export default async function handler(
        req: NextApiRequest,
		res: NextApiResponse<Data>
        ) {
    if (! isValidMethod(req, res, 'POST')) return;

    const board = await createOrUpdateBoard({
		... req.body
    });

    return res.status(200).json({
		message: "Board persisted.",
		data: board,
    });
}
