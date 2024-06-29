import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let lastId = 0;

/**
 * @see https://redux-toolkit.js.org/api/createslice#parameters
 */
const slice = createSlice({
  name: "bugs",
  initialState: [],
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

export const getUnresolvedBugs = (state) =>
  state.entities.bugs.filter((bug) => !bug.resolved);

export const getResolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.filter((bug) => bug.resolved)
);

export const getUnresolvedBugs2 = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((item) => !item.resolved)
);

export const getBugByUser = (userId) =>
  createSelector(
    (store) => store.entities.bugs,
    (store) => store.entities.users,
    (bugs) => bugs.filter((bug) => bug.user === userId)
  );
