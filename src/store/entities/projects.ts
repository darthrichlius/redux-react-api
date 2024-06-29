import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "projects",
  initialState: [],
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
