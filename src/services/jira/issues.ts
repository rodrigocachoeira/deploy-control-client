import { DeployedIssuesRequest, issueRequest } from '../../../types/requests/jiraRequest';
import { get, post } from "./fetch";

export async function getDeployedIssues(context: any, props: DeployedIssuesRequest) {
    return await post(context, `/api/issues/deployed/${props.boardName}`, {
        boardId: props.boardId
    });
}

export async function getIssue(context: any, props: issueRequest) {
    return await get(context, `/api/issues/${props.issueTitle}`);
}