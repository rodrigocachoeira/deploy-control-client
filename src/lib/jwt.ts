import jwt from "jsonwebtoken";

import { auth } from '../config';

type JwtData = {
    id: number;
    email: string;
}

export function createJwtToken(data: JwtData) {
    const payload = { id: data.id };
    const expireRule = { expiresIn: auth.expires };

    return jwt.sign(payload, auth.secrect, expireRule);
}