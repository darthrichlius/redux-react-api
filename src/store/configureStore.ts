import { configureStore } from "@reduxjs/toolkit";
import reducer from "./entities";

export default function () {
  return configureStore({ reducer });
}
