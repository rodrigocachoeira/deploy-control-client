import axios from 'axios';
import { parseCookies }  from 'nookies';

export function getApiClient(context: any) {
    const { 'deployControlClient.authToken': token } = parseCookies(context);

    const api = axios.create({
		baseURL: 'http://localhost:3000',
	});

    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

	return api;
}