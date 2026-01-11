import { v4 as uuid } from "uuid";

export const users: any[] = [];
export const sessions: any[] = [];

export function createUser(email: string, passwordHash: string) {
  const user = { id: uuid(), email, passwordHash };
  users.push(user);
  return user;
}
