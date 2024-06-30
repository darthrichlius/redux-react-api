import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import type { User, Bug, BugQueryState } from "@/store/types";
import type { AppState } from "@store/configureStore";
import { apiRequestBegan } from "@store/api";
import { ApiRoutes } from "@store/config/api";

const API_RESOURCE_NAME = "bugs";
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
    // API ACTIONS
    bugApiGetSuccess: (bugs, action) => {
      bugs.list = action.payload;
    },
  },
});

export const { bugAdded, bugResolved, bugAssigned } = slice.actions;
export default slice.reducer;

// -------------------- ACTION CREATORS -------------------- //

export const bugApiGetBugs = () =>
  apiRequestBegan({
    url: ApiRoutes[API_RESOURCE_NAME].get,
    // The commented out bellow approach is also valid
    // onSuccess: "bugs/bugApiGetSuccess"
    onSuccess: slice.actions.bugApiGetSuccess.type,
    /**
     * `onError` has been removed has it can be handled by default by the API Middleware
     * This is more optimized approach and provides more flexibility in our implementation
     * We can specify `onError` for case where we want to apply a specific side-effect to the error case
     */
  });

// -------------------- SELECTORS -------------------- //

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
