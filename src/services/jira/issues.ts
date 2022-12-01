import type { issueProps } from '../../../types/services/IssueProps';
import type { Issue } from '../../../types/issue';

import { post } from "./fetch";

export async function getIssuesOfBoard(context: any, props: issueProps) {
    const issues: Issue[] = [];

    const data = await post(context, `/api/issues/${props.board}`, {
        sprint: props.sprint,
		status: props.status,
	});

    data.forEach((issue: any) => {
		issues.push({
			number: issue.id,
			title: issue.title,
            type: 'BUG',
            tags: [],
            author: {
                email: issue.assignee.name,
				image: issue.assignee.image,
            },
            approvesCount: 0,
            requestedReviews: {
                back: false,
                front: false,
                infra: true,
            }
        });
    });

	return issues;
}