import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { type IUser } from "./users";
import { IState } from "../configureStore";

export interface IBug {
  id: number;
  resolved: boolean;
  description: string;
  user: IUser | null;
}

let lastId = 0;

/**
 * @see https://redux-toolkit.js.org/api/createslice#parameters
 */
const slice = createSlice({
  name: "bugs",
  initialState: [] as IBug[],
  reducers: {
    bugAdded: (state, action) => {
      state.push({
        id: ++lastId,
        resolved: false,
        description: action.payload.description,
        user: null,
      });
    },

    bugResolved: (bugs, action) => {
      const ix = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[ix].resolved = true;
    },
    bugAssigned: (bugs, action) => {
      const ix = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[ix].user = action.payload.userId;
    },
  },
});

export const { bugAdded, bugResolved, bugAssigned } = slice.actions;
export default slice.reducer;

export const getUnresolvedBugs = (state: IState) =>
  state.entities.bugs.filter((bug) => !bug.resolved);

export const getResolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.filter((bug) => bug.resolved)
);

export const getUnresolvedBugs2 = createSelector(
  (state: IState) => state.entities.bugs,
  (state: IState) => state.entities.projects,
  (bugs, projects) => bugs.filter((item) => !item.resolved)
);

export const getBugByUser = (userId: Pick<IUser, "id">) =>
  createSelector(
    (state: IState) => state.entities.bugs,
    (state: IState) => state.entities.users,
    (bugs) => bugs.filter((bug) => bug.user === userId)
  );
