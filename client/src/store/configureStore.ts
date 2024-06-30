import { configureStore } from "@reduxjs/toolkit";
import reducer from "@store/entities";
import api from "@store/middleware/api.middleware";
import logger from "@store/middleware/logger.middleware";

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

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
// We should avoid `RootState` naming to prevent ambiguous situation, as redux already has its own `RootState`declaration
export type AppRootState = ReturnType<typeof store.getState>;
export interface AppState {
  entities: AppRootState;
}
