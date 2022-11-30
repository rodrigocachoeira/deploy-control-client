import { setCookie } from "nookies";
import { api } from "./api";

export function login(token: string, email: string) {
    setCookie(undefined, 'deployControlClient.authToken', token, {
        maxAge: 60 * 60 * 24, // 1 day
    });

    api.defaults.headers['Authorization'] = `Beader ${token}`;

    return {
		email: email,
    };
}