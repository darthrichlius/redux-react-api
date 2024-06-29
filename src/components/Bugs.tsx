import { useContext } from "react";
import { StoreContext } from "../context/storeContext";

export default function Bugs() {
  const store = useContext(StoreContext);

  console.log(store);

  return <div>Bugs</div>;
}
