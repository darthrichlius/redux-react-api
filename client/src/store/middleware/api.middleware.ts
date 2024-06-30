import axios, { type AxiosError, type AxiosResponse } from "axios";
import { Middleware, type Action } from "redux";
import { apiRequestBegan, apiRequestFailed, apiRequestSuccess } from "../api";
import { AppStore } from "@store/configureStore";

export interface ApiRequestActionPayload {
  url: string;
  /**
   * `get` is the default method of axios
   * if the member is not provided, axios will default it
   */
  method?: "get" | "post" | "put" | "delete" | "patch" | "delete";
  data?: unknown; //ESLint doesn't like `any`
  /**
   * We passing string and not function
   * Action should be serializable and storable
   * Function are not serializable
   *
   * The two members below are "actions type"
   */
  onSuccess?: string;
  onError?: string;
}

export interface ApiResponseSuccessActionPayload {
  // @todo IMPROVEMENT: Provide a normalized APIResponse format
  data: AxiosResponse<unknown>; //ESLint doesn't like `any`
}

export interface ApiResponseFailedActionPayload {
  error: AxiosError;
}

export interface ApiRequestAction extends Action<string> {
  type: string;
  payload: ApiRequestActionPayload;
}

const api: Middleware = (store) => (next) => async (action) => {
  try {
    /**
     * If we don't do this, we will not be able to see API action in the redux development tool
     * Yet, we only process API actions
     */
    next(action);
    /**
     *@todo provide the right signature to avoid type casting on every line
     **/
    if ((action as ApiRequestAction).type === apiRequestBegan.type) {
      const { url, method, data, onSuccess } = (action as ApiRequestAction)
        .payload;
      const res: AxiosResponse = await axios.request({
        baseURL: import.meta.env.VITE_API_URL,
        url,
        method,
        data,
      });

      handleOnSuccess({
        store: store as AppStore,
        onSuccess,
        data: res.data,
      });
    }
  } catch (err) {
    // We are obliged to do this as we don't have access to the `try` scope
    const _onError = (action as ApiRequestAction).payload.onError;
    handleOnError({
      store: store as AppStore,
      onError: _onError,
      error: err as AxiosError,
    });
  }
};

const handleOnSuccess = ({
  store,
  onSuccess,
  data,
}: {
  store: AppStore;
  onSuccess?: string;
  data: AxiosResponse;
}): void => {
  if (!onSuccess) {
    // General error cases
    store.dispatch(
      apiRequestSuccess({
        data,
      })
    );
  } else {
    store.dispatch({
      type: onSuccess,
      payload: {
        data,
      },
    });
  }
};

const handleOnError = ({
  store,
  onError,
  error,
}: {
  store: AppStore;
  onError?: string;
  error: AxiosError;
}): void => {
  // General error cases
  if (!onError) {
    // @todo make sure the result format is properly related to `ApiActionPayload`
    store.dispatch(apiRequestFailed({ error }));
  } else {
    /**
     * Specific error cases
     * Used when a specific action is provided for failed scenario
     */
    store.dispatch({
      type: onError,
      payload: {
        error,
      },
    });
  }
};

export default api;
