import BugsRaw from "@@/src/components/Bugs.raw";
import { StoreContext } from "@/context/storeContext";
import configureStore from "@store/configureStore";

const store = configureStore();

/*

// This is just for testing
// Should showcase how that the caching approach works
setTimeout(() => {
  store.dispatch(bugApiGetBugsWithCache());
}, 2000);
// This is just for testing
// Should showcase how that the caching approach works
setTimeout(() => {
  store.dispatch(bugApiGetBugsWithCache());
}, 61000);
*/
export default function App() {
  return (
    <StoreContext.Provider value={store}>
      <BugsRaw />
    </StoreContext.Provider>
  );
}
