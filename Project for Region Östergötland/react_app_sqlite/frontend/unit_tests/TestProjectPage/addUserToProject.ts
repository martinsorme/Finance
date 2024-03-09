import { User } from "../../src/Types";


export const isUserInProject = (userId: number, users: User[]) => {
    return users.some(user => user.userId === userId);
};