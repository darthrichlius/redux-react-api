import Bugs from "@/components/Bugs";
import { StoreContext } from "@/context/storeContext";
import configureStore from "@store/configureStore";
import { apiRequestBegan } from "@store/api";

const apiActionTest = apiRequestBegan({
  url: "/bug",
  onSuccess: "api/getBugsSuccess",
  /**
   * `onError` has been removed has it can be handled by default by the API Middleware
   * This is more optimized approach and provides more flexibility in our implementation
   * We can specify `onError` for case where we want to apply a specific side-effect to the error case
   */
});

const store = configureStore();

store.dispatch(apiActionTest);

export default function App() {
  return (
    <StoreContext.Provider value={store}>
      <Bugs />
    </StoreContext.Provider>
  );
}
