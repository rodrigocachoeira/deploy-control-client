import { NextApiRequest, NextApiResponse } from "next";

export function isValidMethod(
        req: NextApiRequest,
		res: NextApiResponse,
		expectedMethod: string
	): boolean {
    if (req.method !== expectedMethod) {
		res.status(405).json({
			message: 'Method not allowed'
        });

        return false;
    }

	return true;
}