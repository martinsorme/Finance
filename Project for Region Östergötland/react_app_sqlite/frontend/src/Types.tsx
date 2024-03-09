export interface User {
  userId: number;
  name: string;
  email: string;
  profileIcon: string | null;
  unit: string | null;
  jobTitle: string | null;
  role: Role;
  notifications: Notification[];
  suggestions: Suggestion[];
  tasks: Task[];
  projectRole?: string;
  phoneNumber : string; 
}

enum Role {
  user = "User",
  admin = "Admin",
  // Add more roles as needed
}

export interface Notification {
  notificationId: number;
  message: string;
  timestamp: Date;
}

export interface Suggestion {
  suggestionId: number;
  descriptionImportance?: string; 
  descriptionImpact?: string;
  descriptionRequirements? : string; 
  name: string;
  categories: { categoryId: number; categoryName: string }[]; //Should prob be changed to category
  importanceDescription: string;
  differenceDescription: string;
  requirementsDescription: string;
  creationTime: Date; // Use Date type for datetime fields
  creator: number;
  
}


export interface Project {
  projectId: number;
  title: string;
  creator_id: number;
  users: User[]; // Assuming User is an interface representing a User entity
  tasks: Task[];
  importance: string;
  goal: string;
  method: string;
  measurements: string;
  timeLine: Date; // Use Date type for datetime fields
  status: ProjectStatus;
  documentation: Document[];
  requirements : string; 
  evaluationExplanation : string ; 
  evaluationSummary : string; 
  evaluation : string; 
  deadline: Date;
  categories : Category[]; 
  difference : string; 
}
export enum ProjectStatus {
  utkast = "Utkast",
  notYetStarted = "not_yet_started",
  p = "P",
  d = "D",
  s = "S",
  a = "A",
  finished = "Finished",
  archived = "Archived",
}
export interface Task {
  taskId: number;
  taskName: string;
  taskDescription: string;
  status: TaskStatus;
  project_id: number; // Assuming Project is an interface representing a Project entity
  users: User[];
  result: string; 
}

export interface LogBook {
  logBookId: number;
  logBookTitle: string;
  logBookColor: string;
  logBookDescription: string;
  user: string;
  timeStamp: Date | string;
  project_id: number;
}

export enum TaskStatus {
  notYetStarted = "Not yet Started",
  ongoing = "Ongoing",
  finished = "Finished",
}
export interface Document {
  documentId: number;
  documentName: string;
  timeStamp: Date;
  projectIds: number[];
}
export enum ProjectRole {
  team_Leader = "Team-Leader",
  team_Member = "Team-Member",
  viewer = "Viewer",
}
enum CategoryProject {
    option1 = 'Akutvård',
    option2 = 'Anamnestagning',
    option3 = 'Arbetsmiljö',
    option4 = 'Barn- och ungdomshälsa',
    option5 = 'Cancersjukdomar',
    option6 = 'Endokrina sjukdomar',
    option7 = 'Fallrisk',
    option8 = 'Hemsjukvård',
    option9 = 'Hjärt- och kärlsjukdomar',
    option10 = 'Hud- och könssjukdomar',
    option11 = 'Infektionssjukdomar',
    option12 = 'Kirurgi och plastikkirurgi',
    option13 = 'Kvinnosjukdomar och förlossning',
    option14 = 'Levnadsvanor',
    option15 = 'Lung- och allergisjukdomar',
    option16 = 'Mag- och tarmsjukdomar',
    option17 = 'Medicinsk diagnostik',
    option18 = 'Munhälsa',
    option19 = 'Nervsystemets sjukdomar',
    option20 = 'Njur- och urinvägssjukdomar',
    option21 = 'Nutrition',
    option22 = 'Omvårdnad',
    option23 = 'Palliativ vård',
    option24 = 'Patientsäkerhet',
    option25 = 'Perioperativ vård, intensivvård och transplantation',
    option26 = 'Personcentrerad vård',
    option27 = 'Primärvård',
    option28 = 'Psykisk hälsa',
    option29 = 'Rehabilitering, habilitering och försäkringsmedicin',
    option30 = 'Reumatiska sjukdomar',
    option31 = 'Rutiner',
    option32 = 'Rörelseorganens sjukdomar',
    option33 = 'Slutenvård',
    option34 = 'Specialistvård',
    option35 = 'Statustagning',
    option36 = 'Sällsynta sjukdomar',
    option37 = 'Tandvård',
    option38 = 'Vårddokumentation',
    option39 = 'Vårdhygien',
    option40 = 'Ögonsjukdomar',
    option41 = 'Öppenvård',
}
export interface Category {
  categoryId: number;
  categoryName: CategoryProject;
}

  export interface Notification {
    notificationId: number;
    message: string;
    timestamp: Date;
    userId: number;
    projectId: number;
  }



export interface Measurement {
  measurementId: number;
  name: string;
  unit: string;
  frequencyAmount: number | undefined;
  frequencyInterval: string;
  project_id: number;
}

export interface AdminNotification extends Notification {
  suggestionId: number;
}
