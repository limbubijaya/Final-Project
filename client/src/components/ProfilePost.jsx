import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function ProfilePost({ displayName }) {
  const [userInfo, setUserInfo] = useState(null);
  const [isFollowing, setIsFollowing] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const myDisplayName = Cookies.get("username");
  const navigate = useNavigate();

  useEffect(() => {
    const checkCurrentUserFollowing = async () => {
      try {
        const response = await axios.post(
          "/api/profile/profileCheckFollowing",
          {
            display_name: displayName,
            myDisplayName: myDisplayName,
          }
        );
        setIsFollowing(response.data.isUserFollowingThePostUser);
      } catch (error) {
        console.error("Error getting profile info:", error);
      }
    };
    checkCurrentUserFollowing();
  }, [displayName, myDisplayName]);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await axios.post("/api/profile/postUnfollow", {
          display_name: displayName,
          myDisplayName: myDisplayName,
        });
      } else {
        await axios.post("/api/profile/postFollower", {
          display_name: displayName,
          myDisplayName: myDisplayName,
        });
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await axios.post("/api/profile/profileInfo", {
          display_name: displayName,
        });
        console.log(response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error getting profile info:", error);
      }
    };
    fetchProfileInfo();
  }, [displayName, isFollowing]);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await axios.post("/api/profile/profileInfo", {
          display_name: displayName,
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error getting profile info:", error);
      }
    };
    const fetchProfilePost = async () => {
      try {
        const response = await axios.post("/api/profile/profilePost", {
          display_name: displayName,
        });
        setUserPosts(response.data.yourProfilePost);
      } catch (error) {
        console.error("Error getting profile post:", error);
      }
    };
    fetchProfileInfo();
    fetchProfilePost();
  }, [displayName]);

  const handlePostClick = (post) => {
    navigate(`/feedPost/${displayName}/${post.id}`, {
      state: { post, displayName },
    });
  };

  return (
    <div className="flex flex-col place-items-center">
      <div>
        {userInfo ? (
          <div
            className="border-x-8 border-b-8 w-[25vw] mt-[-11rem] p-4 h-[16vh] overflow-hidden overflow-y-scroll border-black dark:border-white text-inherit"
            style={{
              overflowX: "hidden",
              overflowY: "scroll",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
            }}
          >
            <div className="flex ">
              <div
                className="rounded-full w-32 h-32 mb-4 border-4 border-black dark:border-white"
                style={{
                  background: `url('${userInfo.profile_pic}') center center / cover no-repeat`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
              <div className="text-left ms-4 flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold mb-2 max-w-[200px] overflow-hidden">
                    {userInfo.display_name}
                  </h2>
                </div>
                <div className="overflow-y-auto overflow-hidden">
                  <p className="mb-4">{userInfo.bio}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className="w-[70vw] border-b-4 border-black dark:border-white flex">
        {userInfo ? (
          <div>
            <div className="flex gap-8 mr-[40rem]">
              <div className="text-center">
                <p>
                  <span className="font-bold">{userInfo.followingCount}</span>{" "}
                  Following
                </p>
              </div>
              <div className="text-center">
                <p>
                  {" "}
                  <span className="font-bold">
                    {userInfo.followerCount}
                  </span>{" "}
                  Followers
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        {myDisplayName !== displayName && (
          <div>
            {isFollowing ? (
              <button
                className="ms-[27rem] hover:bg-red-700 text-inherit font-bold w-[4vw]"
                onClick={handleFollowToggle}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="ms-[27rem] hover:bg-blue-700 text-inherit font-bold w-[4vw]"
                onClick={handleFollowToggle}
              >
                Follow
              </button>
            )}
          </div>
        )}
      </div>

      <div
        className="flex flex-wrap justify-center w-[65vw] h-[60vh] gap-4 overflow-y-scroll overflow-hidden mt-5"
        style={{
          overflowX: "hidden",
          overflowY: "scroll",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {userPosts.length > 0 ? (
          userPosts.map((post, index) => (
            <div
              key={index}
              className="rounded-3xl border-8  w-[250px] h-[250px] cursor-pointer border-black dark:border-white"
              onClick={() => handlePostClick(post)}
              style={{
                background: `url('${post.media}') center center / cover no-repeat`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
          ))
        ) : (
          <p>User has 0 post</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePost;
