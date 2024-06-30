import { createSlice } from "@reduxjs/toolkit";
import { IProject } from "@/store/types";

let lastId = 0;

const slice = createSlice({
  name: "projects",
  initialState: [] as IProject[],
  // a.k.a Action Handlers
  reducers: {
    // action => Action Handler
    projectAdded: (state, action) => {
      // REMEMBER: This is the payload part
      state.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

export const { projectAdded } = slice.actions;
export default slice.reducer;
