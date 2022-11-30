import axios from 'axios';
import { parseCookies }  from 'nookies';

export function getApiClient(baseUrl: string, context: any) {
    const { 'deployControlClient.authToken': token } = parseCookies(context);

    const api = axios.create({
		baseURL: baseUrl,
	});

    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

	return api;
}

export function getGithubApi(context: any) {
    const BASE_PATH = process.env.GITHUB_API;

    return getApiClient(String(BASE_PATH), context);
}

export function getJiraApi(context: any) {
    const BASE_PATH = process.env.JIRA_API;

    return getApiClient(String(BASE_PATH), context);
}