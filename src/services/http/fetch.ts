import { parseCookies } from 'nookies';

export async function post(context: any, path: string, body: any) {
    return await request(path, 'POST', body, getToken(context));
}

export async function destroy(context: any, path: string, body: any) {
    return await request(path, 'DELETE', body, getToken(context));
}

async function request(path: string, method: string, body: any, token: string) {
    return await fetch(path, {
        method: method,
		headers: {
            'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(body)
    });
}

function getToken(context: any) {
    const { 'deployControlClient.authToken': token } = parseCookies(context);

    return token;
}