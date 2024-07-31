import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineExplore } from "react-icons/md";
import Cookies from "js-cookie";

function ExplorePost() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const userDisplayName = Cookies.get("username");

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get("/api/posts/all");
      const filteredPosts = response.data.allPosts.filter(
        (post) => post.display_name !== userDisplayName
      );
      setPosts(filteredPosts);
      console.log(filteredPosts);
      setFilteredPosts(filteredPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const handlePostClick = (displayName, postId) => {
    navigate(`/feedPost/${displayName}/${postId}`);
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
    const filteredPosts = posts.filter((post) =>
      post.game_name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(filteredPosts);
  };

  return (
    <div className="m-0 absolute top-[50%] translate-y-[-50%] translate-x-[-40%] left-[50%]">
      <div className="flex ms-[20%] mb-8 ring-4 p-1 ring-black bg-white dark:bg-black dark:ring-white !border-none outline-none focus:outline-none w-[40vw] rounded-lg">
        <input
          type="text"
          placeholder="Search for games"
          value={search}
          onChange={handleSearch}
          className=" p-1  bg-white dark:bg-black !border-none outline-none focus:outline-none w-[40vw] rounded-lg"
        />
        <MdOutlineExplore className="size-[2vw]" />
      </div>
      <div
        className="flex flex-wrap justify-center gap-4 overflow-y-scroll overflow-hidden h-[70vh] w-[70vw] rounded-3xl border-4 p-4 border-black text-black dark:border-white dark:text-white"
        style={{
          overflowX: "hidden",
          overflowY: "scroll",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="rounded-3xl border-8 place-items-center w-[300px] h-[300px] border-black dark:border-white cursor-pointer"
            onClick={() => handlePostClick(post.display_name, post.id)}
            style={{
              background: `url('${post.media}') center center / cover no-repeat`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default ExplorePost;
