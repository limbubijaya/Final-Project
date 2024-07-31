import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Interest() {
  const displayName = Cookies.get("username")
  const [interests, setInterests] = useState([]);

  const handleSearch = async (e) => {
    const searchTerm = e.currentTarget.value;
    try {
      if (searchTerm.trim() === "") {
        setInterests([]);
        return;
      }

      const res = await axios.get(`/api/interest/search/${searchTerm}`);
      if (res.status !== 200) {
        console.log("Error");
        return;
      }

      if (res.data.error) {
        console.log("Error: " + res.data.error);
        return;
      }
      setInterests(JSON.parse(res.data.interests));
      console.log(res.data.interests);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {

  }

  return (
    <div className="flex m-0 absolute top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%]">
      <div className="rounded-3xl border-8 place-items-center p-2 w-[22vw] h-[60vh] border-black text-black dark:border-white dark:text-white">
        <div className="flex flex-col items-center order-4 mt-1 rounded-3xl border-black dark:border-white p-4 w-[20vw]">
          <h1 className="text-[35px] mt-10 mb-12 italic font-bricks-sans">
            GamersUnited
          </h1>
          <div className="mb-5">
            <input
              type="text"
              name="interest"
              id="interest"
              className="ring-4 ring-black bg-white dark:bg-black dark:ring-white w-[15vw] p-1 outline-none"
              onChange={handleSearch}
              placeholder="Search......"
              required
            />
          </div>
          {interests.length > 0 && (
            <div>
              {interests.map((interest) => (
                <div key={`${interest.genre_name}-${interest.game_name}`}>
                  <span>{interest.genre_name}</span>
                  <span>{interest.game_name}</span>
                  <input type="checkbox" />
                </div>
              ))}
            </div>
          )}
          <Link to="/homepage">
            <div
              className=" font-bold border-2 text-white bg-black border-black 
            dark:text-black dark:bg-white dark:border-white rounded-xl w-[10vw] hover:bg-blue-400"
            >
              Done
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Interest;
