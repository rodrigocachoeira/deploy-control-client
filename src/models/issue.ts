import { prisma } from "../lib/prisma";
import { Issue } from '../../types/models/issue';

export async function createOrUpdateIssue(issue: Issue) {
    if (! issue.id) {
        return await createIssue(issue);
    }

	const issueInDatabase = await findIssue(issue.id);

    if (issueInDatabase != null) {
        return await updateBoard(issueInDatabase.id, issue);
    }
}

export async function findIssue(issueId: number) {
    return await prisma.issue.findFirst({
		where: {
            id: issueId
        }
    });
}

export async function createIssue(issue: Issue) {
    issue.createdAt = new Date();
    issue.updatedAt = new Date();

    return await prisma.issue.create({
		data: {
            ... issue,
		}
    });
}

export async function updateBoard(issueId: number, issue: Issue) {
    return await prisma.issue.update({
		where: {
            id: issueId,
		},
		data: {
            ... issue
        }
    });
}