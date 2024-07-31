import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  posts: [],
  currentPostIndex: 0,
  currentPostLikes: 0,
  // value: [
  //   {
  //     display_name: "",
  //     game_name: "",
  //     description: "",
  //     media: "",
  //   },
  // ],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setCurrentPostIndex: (state, action) => {
      state.currentPostIndex = action.payload;
    },
    setCurrentPostLikes: (state, action) => {
      state.currentPostLikes = action.payload;
    },
  },
});

export const fetchFollowerPostsThunk = () => async (dispatch) => {
  try {
    const displayName = Cookies.get("username");

    const response = await axios.post("/api/posts/followersPost", {
      display_name: displayName,
    });
    console.log("response follower post", response.data);
    if (response.status !== 200) {
      throw new Error("Failed to fetch follower posts");
    }
    dispatch(setPosts(response.data.followerPosts));

    const posts = response.data.followerPosts;
    const id = posts[0].id;

    const res = await axios.post("/api/posts/getPostLikes", {
      postId: id,
    });
    if (res.status !== 200) {
      throw new Error("Failed to fetch follower posts");
    }
    dispatch(setCurrentPostLikes(res.data.likes));
  } catch (e) {
    console.log("Failed to fetch follower posts: ", e);
  }
};

export const fetchCurrentPostLikesThunk =
  (currentPostIndex) => async (dispatch, getState) => {
    try {
      const state = getState();
      const id = state.posts.posts[currentPostIndex].id;
      const response = await axios.post("/api/posts/getPostLikes", {
        postId: id,
      });
      if (response.status !== 200) {
        throw new Error("Failed to fetch follower posts");
      }
      dispatch(setCurrentPostLikes(response.data.likes));
    } catch (e) {
      console.log("Failed to fetch follower posts: ", e);
    }
  };

export const { setPosts, setCurrentPostIndex, setCurrentPostLikes } =
  postsSlice.actions;

export default postsSlice.reducer;
