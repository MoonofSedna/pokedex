import { createSlice } from "@reduxjs/toolkit";
// interfaces
import { User } from "@/interfaces/user";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  } as {
    user: User | null;
  },
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
