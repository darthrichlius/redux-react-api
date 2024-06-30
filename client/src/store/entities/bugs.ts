import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import moment from "moment";
import type { User, Bug, BugQueryState, BugRegister } from "@/store/types";
import type {
  AppDispatch,
  AppRootState,
  AppState,
} from "@store/configureStore";
import { apiRequestBegan } from "@store/api";
import { ApiCaching, ApiRoutes } from "@store/config/api.config";

const API_RESOURCE_NAME = "bugs";
let lastId = 0;

/**
 * @see https://redux-toolkit.js.org/api/createslice#parameters
 */
const slice = createSlice({
  name: "bugs",
  initialState: {
    data: [] as Bug[],
    loading: false,
    lastFetch: null,
  } as BugQueryState,
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.data.push({
        id: ++lastId,
        resolved: false,
        description: action.payload.description,
        user: null,
      });
    },
    bugResolved: (bugs, action) => {
      const ix = bugs.data.findIndex((bug) => bug.id === action.payload.id);
      bugs.data[ix].resolved = true;
    },
    bugAssigned: (bugs, action) => {
      const ix = bugs.data.findIndex((bug) => bug.id === action.payload.id);
      bugs.data[ix].user = action.payload.userId;
    },
    // API ACTIONS
    bugApiRequestBegan: (bugs) => {
      bugs.loading = true;
    },
    bugApiRequestFailed: (bugs) => {
      bugs.loading = false;
    },
    /**
     * NOTICE
     * We make sure to clearly define what is in `action.payload.success`
     * This help understanding the code and facilitate debugging
     */
    // ---
    bugApiListSuccess: (bugs, action) => {
      const list: Bug[] = action.payload.success;
      bugs.data = list;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },
    bugApiAddSuccess: (bugs, action) => {
      const created: Bug = action.payload.success;
      bugs.data.push(created);
      bugs.loading = false;
    },
    bugApiResolveSuccess: (bugs, action) => {
      const updated: Bug = action.payload.success;
      const ix = bugs.data.findIndex((bug) => bug.id === updated.id);
      bugs.data[ix].resolved = true;
      bugs.loading = false;
    },
    bugApiDeleteSuccess: (bugs, action) => {
      const deletedId = parseInt(action.payload.success);
      bugs.data = bugs.data.filter((bug) => bug.id !== deletedId);
      bugs.loading = false;
    },
  },
});

export const { bugAdded, bugResolved, bugAssigned } = slice.actions;
export default slice.reducer;

// -------------------- ACTION CREATORS -------------------- //

interface QueryOption {
  cacheTTL: number; // in Minutes
}

/**
 * As a reminder, this chaining approach is possible thanks to redux-thunk
 * Redux Thunk allows you to return a function from an action creator instead of a plain action object.
 * This function, known as a thunk, can then be invoked with the dispatch function and getState function as arguments, giving you access to the Redux store's state and the ability to dispatch additional actions.
 */
/**
 * IMPROVEMENTS
 * This logic should not be hard coded in a Slice
 * We should make it available through the entire application
 * Plus, having two methods is not a good approach neither.
 * We should consider the following approach:
 *  1.Default caching approach
 *  2. Let's the developer out-out or configure the cache strategy
 */
export const bugApiListBugsWithCache =
  (options?: QueryOption) =>
  (dispatch: AppDispatch, getState: () => AppRootState) => {
    const cacheTTL = options?.cacheTTL || ApiCaching.cacheTTL; // in minutes
    const { lastFetch } = getState().bugs as BugQueryState;
    const diff = moment().diff(moment(lastFetch), "minutes");

    if (lastFetch && diff < cacheTTL) return;

    dispatch(bugApiListBugs());
  };

export const bugApiListBugs = () =>
  apiRequestBegan({
    url: ApiRoutes[API_RESOURCE_NAME].list,
    onStart: slice.actions.bugApiRequestBegan.type,
    // The commented out bellow approach is also valid
    // onSuccess: "bugs/bugApiListSuccess"
    onSuccess: slice.actions.bugApiListSuccess.type,
    /**
     * By default `onError`is handled by default by the API Middleware
     * This is more optimized approach and provides more flexibility in our implementation
     * We can specify `onError` for case where we want to apply a specific side-effect to the error case
     */
    onError: slice.actions.bugApiRequestFailed.type,
  });

export const bugApiAddBug = (bug: BugRegister) =>
  apiRequestBegan({
    url: ApiRoutes[API_RESOURCE_NAME].add!,
    method: "post",
    data: bug,
    onStart: slice.actions.bugApiRequestBegan.type,
    onSuccess: slice.actions.bugApiAddSuccess.type,
    onError: slice.actions.bugApiRequestFailed.type,
  });

export const bugApiResolveBug = (bug: Bug) =>
  apiRequestBegan({
    url: ApiRoutes[API_RESOURCE_NAME].resolve!.replace(
      ":id",
      `${bug.id}`
    ).concat("/resolve"),
    method: "patch",
    onStart: slice.actions.bugApiRequestBegan.type,
    onSuccess: slice.actions.bugApiResolveSuccess.type,
    onError: slice.actions.bugApiRequestFailed.type,
  });

export const bugApiDeleteBug = (bug: Bug) =>
  apiRequestBegan({
    url: ApiRoutes[API_RESOURCE_NAME].resolve!.replace(":id", `${bug.id}`),
    method: "delete",
    onStart: slice.actions.bugApiRequestBegan.type,
    onSuccess: slice.actions.bugApiDeleteSuccess.type,
    onError: slice.actions.bugApiRequestFailed.type,
  });

// -------------------- SELECTORS -------------------- //

export const getUnresolvedBugs = (state: AppState) =>
  state.entities.bugs.data.filter((bug) => !bug.resolved);

export const getResolvedBugs = createSelector(
  (state: AppState) => state.entities.bugs,
  (bugs) => bugs.data.filter((bug) => bug.resolved)
);

export const getUnresolvedBugs2 = createSelector(
  (state: AppState) => state.entities.bugs,
  (state: AppState) => state.entities.projects,
  // The code below demonstrates we can inject data to the function
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (bugs, projects) => bugs.data.filter((item) => !item.resolved)
);

export const getBugByUser = (userId: Pick<User, "id">) =>
  createSelector(
    (state: AppState) => state.entities.bugs,
    (state: AppState) => state.entities.users,
    (bugs) => bugs.data.filter((bug) => bug.user === userId)
  );
