import {createContext, useEffect, useState} from "react";
import { parseCookies } from "nookies";
import { AxiosError } from "axios";

import Router from 'next/router';

import { api } from '../../services/api';
import { login } from '../../services/auth';
import { openJwtToken } from "../../lib/jwt";

type User = {
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
    const [user, setUser] = useState<User | null>(null);
	const isAuthenticated = !! user;

    useEffect(() => {
        const { 'deployControlClient.authToken': token } = parseCookies();

        if (token) {
            const payload = openJwtToken(token);

            if (payload) {
                setUser({
					email: payload.email
				});
            }
        }

    }, []);

    async function signIn({email, password}: SignInData): Promise<boolean> {
		const data = await executeLogin(email, password);

        if (! data) {
            return Promise.resolve(false);
        }

		const payload = login(data.token, email);
        setUser(payload);

        Router.push('/dashboard');

        return Promise.resolve(true);
	}

	async function executeLogin(email: string, password: string) {
        return await api.post('/api/users/login', {
            email: email,
			password: password
        }).then(res => {
            return res.data;
        }).catch((err: AxiosError) => {
            return null;
        });
    }

  	return (
		<AuthContext.Provider value={{user, isAuthenticated, signIn}}>
        	{ children }
      	</AuthContext.Provider>
  	)
}