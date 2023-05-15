import { createSlice } from "@reduxjs/toolkit";
// interfaces
import { UserSlice as User } from "../../interfaces/redux-slices";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  } as User,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default UserSlice.reducer;

export const { updateUser } =
  UserSlice.actions;
