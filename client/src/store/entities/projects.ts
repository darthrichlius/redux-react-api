import { createSlice } from "@reduxjs/toolkit";
import type { Project, ProjectQueryState } from "@/store/types";

let lastId = 0;

const slice = createSlice({
  name: "projects",
  initialState: {
    list: [] as Project[],
    loading: false,
    lastFetch: null,
  } as ProjectQueryState,
  // a.k.a Action Handlers
  reducers: {
    // action => Action Handler
    projectAdded: (projects, action) => {
      // REMEMBER: This is the payload part
      projects.list.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

export const { projectAdded } = slice.actions;
export default slice.reducer;
