import type { NextApiRequest, NextApiResponse } from 'next';
import { Issue } from '../../../../../types/issue';
import { JiraDeployedIssue } from '../../../../../types/jira/jiraDeployedIssue';
import { getDeployedIssues } from '../../../../services/jira/issues';

type Data = {
    data: {
      issues: Issue[]
    }
}

export default async function handler(
    req: NextApiRequest,
		res: NextApiResponse<Data>
	) {
  const { boardName } = req.query;
  const { boardId } = req.body;

  const jiraIssues: JiraDeployedIssue[] = await getDeployedIssues(undefined, {
    boardId: boardId,
    boardName: boardName as string
  });

  const issues: Issue[] = jiraIssues.map((jiraIssue: JiraDeployedIssue) => {
    return {
      number: jiraIssue.id,
      title: jiraIssue.title,
      description: jiraIssue.description,
      summary: jiraIssue.summary,
      repositories: jiraIssue.repositories,
      epic: jiraIssue.epic
    };
  });

  return res.status(200).json({
    data: {
      issues: issues
    }
  });
}
