import axios, { type AxiosError, type AxiosResponse } from "axios";
import { Middleware, type Action } from "redux";
import { apiRequestBegan, apiRequestFailed, apiRequestSuccess } from "../api";
import { AppStore } from "@store/configureStore";

export interface ApiSuccessResponse<T> {
  status: boolean;
  data: T | unknown;
}

export interface ApiFailedResponse<T> {
  status: boolean;
  error: T | unknown;
}

export interface ApiRequestActionPayload {
  url: string;
  onStart?: string;
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

export interface ApiResponseSuccessActionPayload<T> {
  // @todo IMPROVEMENT: Provide a normalized APIResponse format
  success: AxiosResponse<ApiSuccessResponse<T>>; //ESLint doesn't like `any`
}

export interface ApiResponseFailedActionPayload<T> {
  error: AxiosError<ApiFailedResponse<T>> | string;
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
      const { url, method, data, onStart, onSuccess } = (
        action as ApiRequestAction
      ).payload;

      if (onStart) store.dispatch({ type: onStart });

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
      error: err as ApiFailedResponse<unknown>,
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
  data: ApiSuccessResponse<unknown>;
}): void => {
  if (!onSuccess) {
    // General success cases
    store.dispatch(
      apiRequestSuccess({
        success: data.data,
      })
    );
  } else {
    store.dispatch({
      type: onSuccess,
      payload: {
        success: data.data,
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
  error: ApiFailedResponse<unknown>;
}): void => {
  /**
   * We extract only the error message as one of the rules of using Redux is "Do Not Put Non-Serializable Values in State or Actions"
   * If we don't adhere to this approach we will end up with an error.
   * To make it short, their main motive is that ACTION SHOULD BE SERIALIZABLE
   * (REPRODUCE: git checkout to the direct previous commit, access the website and check the console error)
   *
   * Bellow is further readings
   * @see https://redux.js.org/faq/actions#why-should-type-be-a-string-why-should-my-action-types-be-constants
   * @see https://redux.js.org/style-guide/#do-not-put-non-serializable-values-in-state-or-actions
   * @see https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
   */
  const errorMessage = "";

  // General error cases
  if (!onError) {
    // @todo make sure the result format is properly related to `ApiActionPayload`
    store.dispatch(apiRequestFailed({ error: errorMessage }));
  } else {
    /**
     * Specific error cases
     * Used when a specific action is provided for failed scenario
     */
    store.dispatch({
      type: onError,
      payload: {
        error: errorMessage,
      },
    });
  }
};

export default api;
