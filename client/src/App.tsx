import { Action } from "redux";
import Bugs from "./components/Bugs";
import { StoreContext } from "./context/storeContext";
import { ApiAction } from "./middleware/api";
import configureStore from "./store/configureStore";

const apiActionTest: ApiAction = {
  type: "apiRequestBegan",
  payload: {
    url: "/bugs",
    onSuccess: "onApiSuccess",
    onError: "onApiRequestError",
  },
};

const store = configureStore();

store.dispatch(apiActionTest as Action);

export default function App() {
  return (
    <StoreContext.Provider value={store}>
      <Bugs />
    </StoreContext.Provider>
  );
}
