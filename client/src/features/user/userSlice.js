import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  value: {
    email: "",
    password: "",
    display_name: "",
    bio: "",
    profile_pic: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmailPass: (state, action) => {
      const newUser = state.value;
      newUser.email = action.payload.email;
      newUser.password = action.payload.password;
      state.value = newUser;
    },
    setDisplayBioProfile: (state, action) => {
      const newUser = state.value;
      newUser.display_name = action.payload.display_name;
      newUser.bio = action.payload.bio;
      newUser.profile_pic = action.payload.profile_pic;
      state.value = newUser;
    },
  },
});

export const createEmailPass =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      if (!email || !password) {
        throw Error("Params invalid!");
      }
      const response = await axios.post("/api/users/validEmail", {
        email: email,
      });
      if (response.status !== 200 || !response.data.valid) {
        throw new Error("Email already exists");
      }

      dispatch(
        setEmailPass({
          email: email,
          password: password,
        })
      );
      return true;
    } catch (e) {
      console.log("Failed to create user: ", e);
      return false;
    }
  };

export const createUserThunk =
  ({ display_name, bio, profile_pic }) =>
  async (dispatch, getState) => {
    try {
      if (!display_name || !bio || !profile_pic) {
        throw new Error("Params invalid!");
      }

      const response = await axios.post("/api/users/validDisplayName", {
        display_name: display_name,
      });
      if (response.status !== 200 || !response.data.valid) {
        throw new Error("Display name already exists");
      }

      dispatch(
        setDisplayBioProfile({
          display_name: display_name,
          bio: bio,
          profile_pic: profile_pic,
        })
      );

      const state = getState();

      //console.log("Thunk state", state.user.value);
      const createResponse = await axios.post(
        "/api/users/signup",
        state.user.value
      );
      if (createResponse.status !== 200 || false) {
        throw new Error("Failed to create user");
      }

      return true;
    } catch (e) {
      console.log("Failed to create user: ", e);
      return false;
    }
  };

export const { setEmailPass, setDisplayBioProfile } = userSlice.actions;

export default userSlice.reducer;
