export interface IUser {
  id: number;
  name: string;
}

export interface IProject {
  id: number;
  name: string;
}

export interface IBug {
  id: number;
  resolved: boolean;
  description: string;
  user: IUser | null;
}
