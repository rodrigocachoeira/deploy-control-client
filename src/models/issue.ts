import { Issue } from '../../types/models/issue';
import { prisma } from "../lib/prisma";

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

    return await prisma.issue.create({
		data: {
            id: issue.id,
            title: issue.title,
            description: issue.description,
            priority: issue.priority,
            assigneeName: issue.assigneeImage,
            assigneeImage: issue.assigneeImage,
            sprintId: issue.sprintId ?? 1,
            createdAt: new Date(),
            updatedAt: new Date()
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