import { prisma } from "../lib/prisma";
import { User } from "../../types/user";

import {compare, hash} from "bcrypt";

export async function createUser(user: User) {
  console.log(prisma, user);
}

export async function login({email, password}: User) {
    const user: (User | null) = await prisma.user.findFirst({
		where: {
            email: email
        }
    });

    if (user === null) {
		return null;
    }

    const isValidUser = await compare(password, user.password);

    if (isValidUser) {
        return user;
    }

	return null;
}