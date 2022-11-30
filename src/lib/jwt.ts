import jwt from "jsonwebtoken";

import { auth } from '../config';

type JwtData = {
    id: number;
    email: string;
}

export function createJwtToken(data: JwtData) {
    const payload = {
        id: data.id,
		email: data.email
    };
    const expireRule = { expiresIn: auth.expires };

    return jwt.sign(payload, auth.secrect, expireRule);
}

export function openJwtToken(token: string) {
    return jwt.decode(token);
}