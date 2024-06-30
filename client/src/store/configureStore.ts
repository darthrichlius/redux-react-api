import { configureStore } from "@reduxjs/toolkit";
import reducer from "./entities";
import api from "../middleware/api";
import logger from "../middleware/logger";

const store = configureStore({
  reducer,
  /**
   * `.concat(...)` is the recommended approach by redux
   * @see https://redux-toolkit.js.org/api/getDefaultMiddleware
   */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(logger({ target: "console" }))
      .concat(api),
});

export default function () {
  return store;
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export interface IState {
  entities: RootState;
}
