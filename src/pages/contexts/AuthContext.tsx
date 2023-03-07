import { createContext, useEffect, useState } from "react";

import Router from 'next/router';
import { post } from '../../services/http/fetch';

import { Payload } from "../../../types/jwt/payload";
import { loadJwtTokenInSession, login } from '../../services/auth';
import { AlertContext } from "./AlertContext";

type User = {
    id: number;
    email: string;
};

type SignInData = {
    email: string;
    password: string;
};

type AuthContextType = {
    user: User | null;
	isAuthenticated: boolean;
    signIn: (data: SignInData) => void
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<Payload | null>(null);
	const isAuthenticated = !! user;

    useEffect(() => {
        const payload = loadJwtTokenInSession(undefined);

        setUser({
			id: payload.id,
			email: payload.email
        });

    }, []);

    async function signIn({email, password}: SignInData): Promise<boolean> {
		const res: any = await executeLogin(email, password);

        if (res.status !== 200) {
            return Promise.resolve(false);
        }

		const data = await res.json();
        const payload: Payload = login(data.token);
        
        setUser(payload);

        Router.push('/dashboard');

        return Promise.resolve(true);
	}

	async function executeLogin(email: string, password: string) {
        return await post(undefined, '/api/users/login', {
            email: email,
			password: password
        });
    }

  	return (
		<AuthContext.Provider value={{user, isAuthenticated, signIn}}>
        	<AlertContext>
                { children }
            </AlertContext>
      	</AuthContext.Provider>
  	)
}