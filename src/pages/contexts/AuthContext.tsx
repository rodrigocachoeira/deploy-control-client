import {createContext, useEffect, useState} from "react";
import { setCookie, parseCookies } from "nookies";
import Router from 'next/router';

type User = {
    name: string;
    email: string;
    avatarUrl: string;
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
            setUser({
				name: 'Rodrigo',
				email: 'rodrigo.cachoeira@atlastechnol.com',
				avatarUrl: 'helloWorld.png'
            });
        }

    }, []);

    function signIn({email, password}: SignInData) {
        const token = '123';

		setCookie(undefined, 'deployControlClient.authToken', token, {
            maxAge: 60 * 60 * 24, // 1 day
        });

        setUser({
			name: 'Rodrigo',
			email: 'rodrigo.cachoeira@atlastechnol.com',
			avatarUrl: 'helloWorld.png'
        });

        Router.push('/dashboard');
	}

  	return (
		<AuthContext.Provider value={{user, isAuthenticated, signIn}}>
        	{ children }
      	</AuthContext.Provider>
  	)
}