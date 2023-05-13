import { createSlice } from "@reduxjs/toolkit";
// interfaces
import { UserSlice as User } from "../../interfaces/redux-slices";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  } as User,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export default UserSlice.reducer;

export const { setUser, logout } =
  UserSlice.actions;
