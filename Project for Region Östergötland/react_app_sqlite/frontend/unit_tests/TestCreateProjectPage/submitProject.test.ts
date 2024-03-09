import { describe, expect, jest, test} from '@jest/globals';
import { Project, Category } from "../../src/Types";
import { validSubmitProject } from './submitProject';

enum CategoryProject {
    option1 = 'Akutvård',
    option2 = 'Anamnestagning',
}

enum ProjectStatus {
    utkast = "Utkast",
    notYetStarted = "not_yet_started",
    p = "P",
    d = "D",
    s = "S",
    a = "A",
    finished = "Finished",
    archived = "Archived",
  }

const exampleCategories: Category[] = [
    {
        categoryId: 1,
        categoryName: CategoryProject.option1,
    },
    {
        categoryId: 2,
        categoryName: CategoryProject.option2,
    }
]
const emptyCategories: Category[] = []
    

const exampleProjects: Project[] = [
    { //No title
        projectId: 1,
        title: "",
        creator_id: 1,
        users: [], // Assuming User is an interface representing a User entity
        tasks: [],
        importance: "test imp 2",
        goal: "",
        method: "test Requirements 2",
        measurements: "test measurements 2",
        timeLine: new Date('2022-02-14 12:00:00'), // Use Date type for datetime fields
        status: ProjectStatus.d,
        documentation: [],
        deadline: new Date('2022-02-14 12:00:00'),
        categories : exampleCategories,
        difference : "test diferance 2",
    },
    { // No importance
        projectId: 2,
        title: 'Nya Grejer',
        creator_id: 1,
        users: [], 
        tasks: [],
        importance: "",
        goal: "",
        method: "test Requirements 2",
        measurements: "test measurements 2",
        timeLine: new Date('2022-02-14 12:00:00'), 
        status: ProjectStatus.d,
        documentation: [],
        deadline: new Date('2022-02-14 12:00:00'),
        categories : exampleCategories,
        difference : "test diferance 2",
    },
    { // No difference
        projectId: 3,
        title: 'Nya Grejer',
        creator_id: 1,
        users: [], 
        tasks: [],
        importance: "test imp 2",
        goal: "",
        method: "test Requirements 2",
        measurements: "test measurements 2",
        timeLine: new Date('2022-02-14 12:00:00'), 
        status: ProjectStatus.d,
        documentation: [],
        deadline: new Date('2022-02-14 12:00:00'),
        categories : exampleCategories,
        difference : "",
    },
    { // No method
        projectId: 4,
        title: 'Nya Grejer',
        creator_id: 1,
        users: [], 
        tasks: [],
        importance: "test imp 2",
        goal: "",
        method: "",
        measurements: "test measurements 2",
        timeLine: new Date('2022-02-14 12:00:00'), 
        status: ProjectStatus.d,
        documentation: [],
        deadline: new Date('2022-02-14 12:00:00'),
        categories : exampleCategories,
        difference : "test diferance 2",
    },
    { // Creator id = 0 which means there is no team leader and no categories
        projectId: 5,
        title: 'Nya Grejer',
        creator_id: 0,
        users: [], 
        tasks: [],
        importance: "test imp 2",
        goal: "",
        method: "test Requirements 2",
        measurements: "test measurements 2",
        timeLine: new Date('2022-02-14 12:00:00'), 
        status: ProjectStatus.d,
        documentation: [],
        deadline: new Date('2022-02-14 12:00:00'),
        categories : emptyCategories,
        difference : "test diferance 2",
    },
    { // Creator id = 0 which means there is no team leader 
        projectId: 6,
        title: 'Nya Grejer',
        creator_id: 0,
        users: [], 
        tasks: [],
        importance: "test imp 2",
        goal: "",
        method: "test Requirements 2",
        measurements: "test measurements 2",
        timeLine: new Date('2022-02-14 12:00:00'), 
        status: ProjectStatus.d,
        documentation: [],
        deadline: new Date('2022-02-14 12:00:00'),
        categories : exampleCategories,
        difference : "test diferance 2",
    },

    { // No categories
        projectId: 7,
        title: 'Nya Grejer',
        creator_id: 1,
        users: [], 
        tasks: [],
        importance: "test imp 2",
        goal: "",
        method: "test Requirements 2",
        measurements: "test measurements 2",
        timeLine: new Date('2022-02-14 12:00:00'), 
        status: ProjectStatus.d,
        documentation: [],
        deadline: new Date('2022-02-14 12:00:00'),
        categories : emptyCategories,
        difference : "test diferance 2",
    },
    
    { // Valid project
        projectId: 8,
        title: 'Nya Grejer',
        creator_id: 1,
        users: [], 
        tasks: [],
        importance: "test imp 2",
        goal: "",
        method: "test Requirements 2",
        measurements: "test measurements 2",
        timeLine: new Date('2022-02-14 12:00:00'), 
        status: ProjectStatus.d,
        documentation: [],
        deadline: new Date('2022-02-14 12:00:00'),
        categories : exampleCategories,
        difference : "test diferance 2",
    }
]

describe('validSubmitProject fuction', () => {
    test('A project without a title should be invalid', () => {
        expect(validSubmitProject(exampleProjects, 0)).toBe(false);
    });
    test('A project without importance should be invalid', () => {
        expect(validSubmitProject(exampleProjects, 1)).toBe(false);
    });
    test('A project without difference should be invalid', () => {
        expect(validSubmitProject(exampleProjects, 2)).toBe(false);
    });
    test('A project without method should be invalid', () => {
        expect(validSubmitProject(exampleProjects, 3)).toBe(false);
    });
    test('A project without a team leader and categories should be invalid and alert u to add a team leader and add a category', () => {
        global.alert = jest.fn();
        validSubmitProject(exampleProjects, 4);
        expect(global.alert).toHaveBeenCalledWith('Vänligen välj en teamleader och fyll i minst en kategori.');
    });
    test('A project without a team leader should be invalid and alert u to add a team leader', () => {
        global.alert = jest.fn();
        validSubmitProject(exampleProjects, 5);
        expect(global.alert).toHaveBeenCalledWith('Vänligen välj en teamleader.');
    });
    test('A project without categories should be invalid and alert u to add atleast a category', () => {
        global.alert = jest.fn();
        validSubmitProject(exampleProjects, 6);
        expect(global.alert).toHaveBeenCalledWith('Vänligen välj minst en kategori.');
    });
    test('A valid project', () => {
        expect(validSubmitProject(exampleProjects, 7)).toBe(true);
    });

}
);

