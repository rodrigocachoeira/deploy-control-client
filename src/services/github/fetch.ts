import { parseCookies } from 'nookies';

export async function post(context: any, path: string, body: any) {
    const { 'deployControlClient.authToken': token } = parseCookies(context);
    const BASE_PATH = process.env.GITHUB_API;

	const data = await fetch(BASE_PATH + path, {
        method: 'POST',
		headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
		body: JSON.stringify(body)
    }).then(res => res.json());

    return Promise.resolve(data);
}