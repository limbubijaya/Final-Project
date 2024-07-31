import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function SearchBox() {
  const [search, setSearch] = useState("");
  const [fetchedResults, setFetchedResults] = useState([]);
  const navigate = useNavigate();
  const myDisplayName = Cookies.get("username");

  const handleSearch = (e) => {
    const lowercaseValue = e.target.value.toLowerCase();
    setSearch(lowercaseValue);
  };

  const fetchSearch = async () => {
    try {
      const response = await axios.post("/api/search/byDisplayName", {
        display_name: search,
      });
      setFetchedResults(
        response.data.users.filter((user) => user.display_name !== myDisplayName)
      );
    } catch (error) {
      console.error("Error searching for user:", error);
    }
  };

  useEffect(() => {
    if (search.trim().length > 0) {
      fetchSearch();
    } else {
      setFetchedResults([]);
    }
  }, [search]);

  const handleDisplayNameClick = (displayName) => {
    navigate(`/profile/${displayName}`);
  };
  return (
    <div
      className="m-0 absolute top-[45%] translate-y-[-50%] translate-x-[-40%] left-[50%] flex flex-col items-center mt-4 h-[70vh] overflow-y-scroll overflow-hidden"
      style={{
        overflowX: "hidden",
        overflowY: "scroll",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
      }}
    >
      <div className="">
        <input
          type="text"
          name="Search"
          id=""
          value={search}
          onChange={handleSearch}
          placeholder="Search Display Name of User"
          className="w-[50vw] ring-4 ring-black dark:ring-white text-inherit p-1 bg-white dark:bg-black !border-none outline-none focus:outline-none"
        />
      </div>
      {fetchedResults.length > 0 && (
        <div className="w-[50vw] mt-4 ms-1">
          {fetchedResults.map((user) => (
            <div
              key={user.id}
              className="flex text-left border-2 p-2 my-2 gap-2 h-[7vh] overflow-hidden cursor-pointer"
              onClick={() => handleDisplayNameClick(user.display_name)}
            >
              <div className="rounded-full w-[50px] h-[50px] mb-4 border-2 border-black dark:border-white"
                style={{
                  background: `url('${user.profile_pic}') center center / cover no-repeat`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}>
              </div>
              <div>
                <h3>
                  {user.display_name.charAt(0).toUpperCase() +
                    user.display_name.slice(1)}
                </h3>
                <p>{user.bio}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
