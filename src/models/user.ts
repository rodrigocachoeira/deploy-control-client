import { prisma } from "../lib/prisma";
import { User } from "../../types/models/user";

import { compare, hash } from "bcrypt";

export async function createUser(user: User) {
	user.createdAt = new Date();
    user.updatedAt = new Date();
    user.password = await cryptPassword(user.password);

  	return await prisma.user.create({
	  	data: {
          	... user
      	}
  	});
}

async function cryptPassword(password: string) {
    const saltRounds = 10;

    return await hash(password, saltRounds);
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

export async function findByUserId(userId: number) {
    return await prisma.user.findFirst({
		where: {
            id: userId
        }
    });
}