import { prisma } from "../../lib/prisma";
import { User } from "../../types/user";

export async function createUser(user: User) {
  console.log(user);
}