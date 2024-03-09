import { describe, test, expect} from '@jest/globals';
import { User } from "../../src/Types";
import { isUserInProject } from './addUserToProject';

enum Role {
    user = "User",
    admin = "Admin",
}

const exampleUsers: User[] = [
    {
        userId: 1,
        name: "John Doe",
        email: "john@example.com",
        profileIcon: "",
        unit: "Marketing",
        jobTitle: "Marketing Specialist",
        role: Role.user,
        notifications: [],
        suggestions: [],
        tasks: [], 
        projectRole: "Team Lead",
    },
    {
        userId: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        profileIcon: "",
        unit: "Sales",
        jobTitle: "Sales Representative",
        role: Role.user,
        notifications: [],
        suggestions: [],
        tasks: [],  
        projectRole: "Sales Team Member",
    },
];


describe('isUserInProject function', () => {
    test('User with userId 1 is in the project', () => {
        expect(isUserInProject(1, exampleUsers)).toBe(true);
    });

    test('User with userId 3 is not in the project', () => {
        expect(isUserInProject(3, exampleUsers)).toBe(false);
    });

    test('User with userId 2 is in the project', () => {
        expect(isUserInProject(2, exampleUsers)).toBe(true);
    });

});
