import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import interestReducer from "../features/interest/interestSlice";
import postReducer from "../features/post/postSlice";
import postsReducer from "../features/posts/postsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    interest: interestReducer,
    post: postReducer,
    posts: postsReducer,
  },
});

export default store;
