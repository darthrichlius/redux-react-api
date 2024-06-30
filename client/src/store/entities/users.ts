import { createSlice } from "@reduxjs/toolkit";
import type { User, UserQueryState } from "@/store/types";

let lastId = 0;

const slice = createSlice({
  name: "users",
  initialState: {
    list: [] as User[],
    loading: false,
    lastFetch: null,
  } as UserQueryState,
  reducers: {
    userAdded: (users, action) => {
      // This mutable code is allowed because we use createSlice
      // createSlice uses ImmerJS under the hood
      users.list.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

export default slice.reducer;
export const { userAdded } = slice.actions;
