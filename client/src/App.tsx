import BugsReactRedux from "@@/src/components/BugsReactRedux";
import configureStore from "@store/configureStore";

import { Provider as ReactReduxProvider } from "react-redux";

const store = configureStore();

export default function App() {
  return (
    <ReactReduxProvider store={store}>
      <BugsReactRedux />
    </ReactReduxProvider>
  );
}
