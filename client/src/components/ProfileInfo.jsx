import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProfileInfo({ displayName }) {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  console.log(userInfo);
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
  }, [displayName]);

  return (
    <div className="m-0 absolute top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%]">
      <div className="flex rounded-3xl border-8 place-items-center w-[45vw] h-[60vh] border-black text-black dark:border-white dark:text-white">
        {userInfo ? (
          <div className="flex flex-col items-center">
            <img
              src={userInfo.profile_pic}
              alt={userInfo.display_name}
              className="rounded-full w-32 h-32 mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{userInfo.display_name}</h2>
            <p className="mb-4">{userInfo.bio}</p>
            <div className="flex gap-8">
              <div className="text-center">
                <span className="font-bold">{userInfo.followingCount}</span>
                <p>Following</p>
              </div>
              <div className="text-center">
                <span className="font-bold">{userInfo.followerCount}</span>
                <p>Followers</p>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default ProfileInfo;
