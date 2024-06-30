import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import type { User, Bug, BugQueryState } from "@/store/types";
import type { AppState } from "@store/configureStore";

let lastId = 0;

/**
 * @see https://redux-toolkit.js.org/api/createslice#parameters
 */
const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [] as Bug[],
    loading: false,
    lastFetch: null,
  } as BugQueryState,
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        resolved: false,
        description: action.payload.description,
        user: null,
      });
    },

    bugResolved: (bugs, action) => {
      const ix = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[ix].resolved = true;
    },
    bugAssigned: (bugs, action) => {
      const ix = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[ix].user = action.payload.userId;
    },
  },
});

export const { bugAdded, bugResolved, bugAssigned } = slice.actions;
export default slice.reducer;

export const getUnresolvedBugs = (state: AppState) =>
  state.entities.bugs.list.filter((bug) => !bug.resolved);

export const getResolvedBugs = createSelector(
  (state: AppState) => state.entities.bugs,
  (bugs) => bugs.list.filter((bug) => bug.resolved)
);

export const getUnresolvedBugs2 = createSelector(
  (state: AppState) => state.entities.bugs,
  (state: AppState) => state.entities.projects,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (bugs, projects) => bugs.list.filter((item) => !item.resolved)
);

export const getBugByUser = (userId: Pick<User, "id">) =>
  createSelector(
    (state: AppState) => state.entities.bugs,
    (state: AppState) => state.entities.users,
    (bugs) => bugs.list.filter((bug) => bug.user === userId)
  );
