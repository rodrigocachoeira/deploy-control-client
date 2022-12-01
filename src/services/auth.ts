import { destroyCookie, parseCookies, setCookie } from "nookies";
import { openJwtToken } from "../lib/jwt";

export function login(token: string) {
    const payload: any = openJwtToken(token);

    setCookie(undefined, 'deployControlClient.authToken', token, {
        maxAge: 60 * 60 * 24, // 1 day
    });

    return {
        id: payload.id,
		email: payload.email,
	};
}

export function logout(context: any) {
    destroyCookie(context, 'deployControlClient.authToken');
}

export function loadJwtTokenInSession(context: any) {
    const { 'deployControlClient.authToken': token } = parseCookies(context);

    if (token) {
        const payload: any = openJwtToken(token);

        if (payload) {
            return {
                id: payload.id,
				email: payload.email
            };
        }
    }
	return {};
}