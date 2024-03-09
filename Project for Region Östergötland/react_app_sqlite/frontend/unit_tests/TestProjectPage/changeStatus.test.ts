import { Task, TaskStatus } from "../../src/Types";
import { changeStatus } from "./changeStatus";
import { describe, test, expect} from '@jest/globals';

enum Role {
    user = "User",
    admin = "Admin",
}

  const exampleTask: Task[] = [
    {
        taskId: 1,
        taskName: "Example Task",
        taskDescription: "This is an example task description.",
        status: TaskStatus.notYetStarted,
        deadline: new Date("2023-07-02"),
        project_id: 1,
        users: [
            {
                userId: 123,
                name: "John Doe",
                email: "john@example.com",
                profileIcon: "",
                unit: "Marketing",
                jobTitle: "Marketing Specialist",
                role: Role.user,
                notifications: [],
                suggestions: [],
                tasks: [],  // Assuming an empty array for simplicity
                projectRole: "Team Lead",
            },
        ]
    }
];

  describe('changeStatus', () => {
    test('Change status when taskId matches', () => {
        const updatedTask: Task[] = changeStatus(1, TaskStatus.ongoing, exampleTask);

        // Assert that the task status is updated
        expect(updatedTask[0].status).toBe(TaskStatus.ongoing);
    });

    test('Do not change status when taskId does not match', () => {
        const updatedTask2: Task[] = changeStatus(2, TaskStatus.finished, exampleTask);

        
        expect(updatedTask2[0].status).toBe(TaskStatus.ongoing);
    });
});