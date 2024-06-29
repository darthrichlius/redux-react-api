import Bugs from "./components/Bugs";
import { StoreContext } from "./context/storeContext";
import configureStore from "./store/configureStore";

const store = configureStore();

export default function App() {
  return (
    <StoreContext.Provider value={store}>
      <Bugs />
    </StoreContext.Provider>
  );
}
