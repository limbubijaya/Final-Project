import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  value: {
    display_name: "",
    game_name: "",
    description: "",
    media: "",
    likes: 0,
    comments_count: 0,
  },
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setDisplayName: (state, action) => {
      const newPost = state.value;
      newPost.display_name = action.payload.display_name;
      state.value = newPost;
    },
  },
});

export const createPostThunk = () => async (dispatch, getState) => {
  try {
    const state = getState();

    //console.log("Thunk state", state.user.value);
    const createResponse = await axios.post(
      "/api/posts/create",
      state.post.value
    );
    if (createResponse.status !== 200) {
      throw new Error("Failed to create post");
    }

    return true;
  } catch (e) {
    console.log("Failed to create post: ", e);
    return false;
  }
};

export const { setDisplayName } = postSlice.actions;

export default postSlice.reducer;
