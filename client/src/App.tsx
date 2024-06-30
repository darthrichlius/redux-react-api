import Bugs from "@/components/Bugs";
import { StoreContext } from "@/context/storeContext";
import configureStore from "@store/configureStore";
import { bugApiGetBugs } from "./store/entities/bugs";

const store = configureStore();

const apiActionTest = bugApiGetBugs();

store.dispatch(apiActionTest);

export default function App() {
  return (
    <StoreContext.Provider value={store}>
      <Bugs />
    </StoreContext.Provider>
  );
}
