import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSend } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

function ClickPost({ displayName, post }) {
  const [errorMessage, setErrorMessage] = useState();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likeCount, setLikesCounts] = useState("");
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [postData, setPostData] = useState(null);
  const [postDescription, setPostDescription] = useState("");
  const userDisplayName = Cookies.get("username");
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const response = await axios.post("/api/posts/getUserPost", {
        post_id: post,
        display_name: displayName,
      });
      console.log(response.data);
      setPostData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPostLikes = async () => {
    try {
      const response = await axios.post("/api/posts/getPostLikes", {
        postId: post,
      });
      if (response.status !== 200) {
        throw new Error("Failed to fetch follower posts");
      }
      setLikesCounts(response.data.likes);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchPostLikes();
    fetchPost();
  }, []);

  useEffect(() => {
    if (postData) {
      setPostDescription(postData.description);
    }
  }, [postData]);

  const handleLike = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/posts/likePost`, {
        postId: post,
        display_name: userDisplayName,
      });
      if (response.status != 200) {
        console.log("Feedposts, response status handleLike", response.status);
        return;
      }
      await fetchPostLikes();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/posts/postComment", {
        postId: post,
        display_name: userDisplayName,
        comment: comment,
      });
      if (response.data.posted) {
        setComment("");
        await fetchComments(post);
        setErrorMessage(null);
      } else {
        console.error("Error posting comment:", response.data.error);
        setErrorMessage(response.data.error);
      }
    } catch (error) {
      console.log(error);
      console.error("Error posting comment:", error);
      setErrorMessage(error.response.data.error || error.message);
    }
  };

  const fetchComments = async (post) => {
    try {
      const response = await axios.post(`/api/posts/showComment`, {
        postId: post,
      });
      setComments(response.data.allComments);
      setCommentsLoaded(true);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments(post);
  }, [post, displayName, commentsLoaded]);

  const handleDisplayNameClick = () => {
    navigate(`/profile/${displayName}`);
  };

  return (
    <div id={"post"}>
      <div className="grid grid-rows-1 grid-cols-12 border-4 rounded-2xl dark:border-white border-black w-[45vw] h-[60vh] relative">
        <div className="col-span-8 row-1 overflow-hidden">
          {postData ? (
            <div
              className="overflow-hidden h-[100%]  rounded-l-xl"
              id="bg_feed_img"
              style={{
                background: `url('${postData.media}') center center / cover no-repeat`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
          ) : (
            <div
              className="overflow-hidden min-h-[60vh] rounded-2xl"
              id="bg_feed_img"
            ></div>
          )}
        </div>
        <div className="col-span-4 row-1 border-l-4 dark:border-white border-black">
          <div>
            <div
              id="post-description"
              className="flex rows-span-4 border-b-4 dark:border-white border-black min-h-[18vh] max-h-[18vh] overflow-y-scroll"
              style={{
                overflowX: "hidden",
                overflowY: "scroll",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
              }}
            >
              {postData ? (
                <div
                  className="rounded-full w-[50px] h-[50px] mb-4 border-2 border-black dark:border-white ms-2 my-2"
                  style={{
                    background: `url('${postData.profile_pic}') center center / cover no-repeat`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                ></div>
              ) : (
                <div
                  className="rounded-full w-[50px] h-[50px] mb-4 border-2 border-black dark:border-white ms-2 my-2"
                  style={{
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                ></div>
              )}

              <div className="my-2 w-[13rem]">
                <h1
                  className="text-left ms-2 text-lg cursor-pointer font-bold	"
                  onClick={handleDisplayNameClick}
                >
                  {displayName}
                </h1>
                <p className="text-left ms-2 ">{postDescription} </p>
              </div>
            </div>
            <div id="post-comments" className="min-h-[50vh] max-h-[50vh]">
              <div className=" text-center mx-2">
                <div
                  className="min-h-[36vh] max-h-[36vh] border-b-[1px] overflow-hidden overflow-y-scroll scroll-smooth"
                  style={{
                    overflowX: "hidden",
                    overflowY: "scroll",
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                  }}
                >
                  {comments !== undefined && comments.length > 0 ? (
                    comments.map((comment, index) => (
                      <div
                        key={index}
                        className="px-2 border-b-[1px] border-black dark:border-white m-2 text-sm"
                      >
                        <div className="flex">
                          <div
                            className="rounded-full w-[30px] h-[30px] mb-4 border-2 border-black dark:border-white me-2 mt-3"
                            style={{
                              background: `url('${comment.profile_pic}') center center / cover no-repeat`,
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                            }}
                          ></div>
                          <div
                            className="w-[10vw] my-2 h-10 overflow-hidden overflow-y-scroll"
                            style={{
                              overflowX: "hidden",
                              overflowY: "scroll",
                              WebkitOverflowScrolling: "touch",
                              scrollbarWidth: "none",
                            }}
                          >
                            <h4
                              className="text-left cursor-pointer"
                              onClick={() =>
                                navigate(`/profile/${comment.display_name}`)
                              }
                            >
                              {comment.display_name}:
                            </h4>
                            <p className="text-left">{comment.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No comments yet.</p>
                  )}
                </div>
                <div className="flex items-center justify-evenly m-2 min-h-[4vh] max-h-[4vw] min-w-[20vh] max-w-[20vw]">
                  <button onClick={handleLike}>
                    <FaHeart size="30px" />
                  </button>
                  <span className="px-2">{likeCount}</span>
                  <div className="border-[1px] dark:border-white border-black flex items-center justify-evenly">
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        name="comment"
                        id="comment"
                        className="bg-inherit text-inherit !border-none outline-none focus:outline-none w-[8vw]"
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            console.log("Enter is pressed");
                          }
                        }}
                        placeholder="Insert your comment"
                        required
                      ></input>
                      <button type="submit">
                        <IoMdSend size="10px" />
                      </button>
                    </form>
                  </div>
                </div>
                {errorMessage && (
                  <div className="bg-red-500 mt-5 text-white p-2 rounded-md mb-2">
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ClickPost;
