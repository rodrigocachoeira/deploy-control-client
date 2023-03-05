import type { NextApiRequest, NextApiResponse } from 'next';
import { syncIssues } from "../../../../services/syncIssues";

type Data = {
    data: any
}

export default async function handler(
        req: NextApiRequest,
		res: NextApiResponse<Data>
	) {
    const { repositoryName } = req.query;

	const issues: any = await syncIssues(repositoryName as string);

    return res.status(200).json({
		data: issues
    });
}
