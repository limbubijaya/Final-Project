import Nav from "../components/Nav";
import FeedPosts from "../components/FeedPosts";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentPostLikesThunk,
  fetchFollowerPostsThunk,
  setCurrentPostIndex,
} from "../features/posts/postsSlice";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

export default function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts, currentPostIndex, currentPostLikes } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(fetchFollowerPostsThunk());
    dispatch(setCurrentPostIndex(0));
  }, [navigate]);

  useEffect(() => {
    dispatch(fetchFollowerPostsThunk());
  }, []);
  console.log(posts.length);
  const handlePrevPost = (e) => {
    e.preventDefault();
    if (posts.length > 0 && currentPostIndex > 0) {
      dispatch(setCurrentPostIndex((currentPostIndex - 1) % posts.length));
      dispatch(fetchCurrentPostLikesThunk(currentPostIndex - 1));
    }
  };

  const handleNextPost = (e) => {
    e.preventDefault();
    if (posts.length > 0) {
      dispatch(setCurrentPostIndex((currentPostIndex + 1) % posts.length));
      dispatch(
        fetchCurrentPostLikesThunk((currentPostIndex + 1) % posts.length)
      );
    }
  };

  useEffect(() => {
    if (posts.length > 0) {
      dispatch(fetchCurrentPostLikesThunk(currentPostIndex));
    }
  }, [currentPostIndex]);

  return (
    <div className="inline-flex items-center justify-between w-full">
      <div className="">
        <Nav />
      </div>
      <div className=" mr-[20%]" style={{ position: "relative !important" }}>
        {posts.length > 0 && currentPostIndex < posts.length ? (
          <FeedPosts
            post={posts[currentPostIndex]}
            likes={currentPostLikes}
            currentIndex={currentPostIndex}
          />
        ) : (
          <Link to={"/search"}>
            <div className="m-0 absolute top-[40%] translate-y-[-50%] translate-x-[-40%] left-[50%] ring-4 ring-black dark:ring-white p-2">
              <h1 className="text-2xl">Follow Users to Show Post</h1>
            </div>
          </Link>
        )}

        {posts.length > 0 && currentPostIndex > 0 && (
          <button
            type="button"
            onClick={handlePrevPost}
            className="m-0 absolute right-32 top-20 "
          >
            <FaArrowUp
              size={50}
              className=" border-2 rounded-full border-teal-500 text-teal-500"
            />
          </button>
        )}

        {posts.length > 0 && currentPostIndex < posts.length - 1 && (
          <button
            type="button"
            onClick={handleNextPost}
            className="m-0 absolute right-32 bottom-20 "
          >
            <FaArrowDown
              size={50}
              className=" border-2 rounded-full border-teal-500 text-teal-500"
            />
          </button>
        )}
      </div>
    </div>
  );
}
