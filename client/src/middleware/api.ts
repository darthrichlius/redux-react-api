import axios, { type AxiosResponse } from "axios";
import { Middleware, type Action } from "redux";

export interface ApiAction extends Action<string> {
  type: string;
  payload: {
    url: string;
    /**
     * `get` is the default method of axios
     * if the member is not provided, axios will default it
     */
    method?: "get" | "post" | "put" | "delete" | "patch" | "delete";
    data?: unknown;
    /**
     * We passing string and not function
     * Action should be serializable and storable
     * Function are not serializable
     *
     * The two members below are "actions type"
     */
    onSuccess: string;
    onError: string;
  };
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
    if ((action as ApiAction).type === "apiRequestBegan") {
      const { url, method, data, onSuccess } = (action as ApiAction).payload;
      const res: AxiosResponse = await axios.request({
        baseURL: import.meta.env.VITE_API_URL,
        url,
        method,
        data,
      });
      store.dispatch({ type: onSuccess, payload: res.data });
    }
  } catch (err) {
    store.dispatch({
      type: (action as ApiAction).payload.onError,
      payload: err,
    });
  }
};

export default api;
