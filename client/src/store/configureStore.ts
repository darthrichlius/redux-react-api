import { configureStore } from "@reduxjs/toolkit";
import reducer from "./entities";
import { type IBug } from "./entities/bugs";
import { type IUser } from "./entities/users";
import { type IProject } from "./entities/projects";

export interface IState {
  entities: {
    users: IUser[];
    projects: IProject[];
    bugs: IBug[];
  };
}

export default function () {
  return configureStore({ reducer });
}
