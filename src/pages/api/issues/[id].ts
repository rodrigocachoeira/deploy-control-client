import type { NextApiRequest, NextApiResponse } from 'next';
import { Issue } from '../../../../../types/issue';
import { JiraDeployedIssue } from '../../../../../types/jira/jiraDeployedIssue';
import { getDeployedIssues } from '../../../../services/jira/issues';
import { getIssue } from '../../../services/jira/issues';

type Data = {
    data: {
      issue: Issue
    }
}

export default async function handler(
    req: NextApiRequest,
		res: NextApiResponse<Data>
	) {
  const { id } = req.query;

  const jiraIssue = await getIssue(undefined, {
    issueTitle: id as string
  });

  const issue: Issue = {
    number: jiraIssue.id,
    title: jiraIssue.title,
    description: jiraIssue.description,
    summary: jiraIssue.summary,
    repositories: jiraIssue.repositories,
    epic: jiraIssue.epic
  };

  return res.status(200).json({
    data: {
      issue: issue
    }
  });
}
