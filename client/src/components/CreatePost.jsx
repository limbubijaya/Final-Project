import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function CreatePost() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [gameName, setGameName] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const userDisplayName = Cookies.get("username");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allowedExtensions = [".png", ".jpg", ".jpeg"];
    let isExtensionValid = false;
    for (let i = 0; i < allowedExtensions.length; i++) {
      if (media.includes(allowedExtensions[i])) {
        isExtensionValid = true;
        break;
      }
    }
    if (!isExtensionValid) {
      setErrorMessage(
        "Media input must contain a link with either .png, .jpg, or .jpeg extension."
      );
      return;
    }
    try {
      const response = await axios.post("api/posts/createPost", {
        display_name: userDisplayName,
        game_name: gameName,
        description: description,
        media: media,
      });
      console.log(response.data);
      if (response.data.created) {
        navigate("/homepage");
      } else {
        console.error("Error creating post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleGameNameChange = (e) => {
    const lowercaseValue = e.target.value.toLowerCase();
    setGameName(lowercaseValue);
    setSelectedGame(null);
  };

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setGameName(game.game_name);
    setSearchResults([]);
  };

  const handleGameSearch = async () => {
    try {
      const response = await axios.get(
        `/api/posts/searchForGameInPost/${gameName}`
      );
      setSearchResults(JSON.parse(response.data.game));
    } catch (error) {
      console.error("Error searching for game:", error);
    }
  };

  useEffect(() => {
    if (gameName.trim().length > 0 && !selectedGame) {
      handleGameSearch();
    } else {
      setSearchResults([]);
    }
  }, [gameName, selectedGame]);

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center w-[45vw] h-[60vh] relative">
        <div className="flex">
          <h1 className="text-center text-3xl text-inherit mb-1">
            Create Post
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-4 items-center border-4 rounded-2xl dark:border-white border-black w-[45vw] h-[60vh]"
        >
          <div>
            <input
              type="text"
              className="ring-4 p-1 ring-black bg-white dark:bg-black dark:ring-white !border-none outline-none focus:outline-none w-[15vw]"
              placeholder="Game Name"
              value={gameName}
              onChange={handleGameNameChange}
              required
            />
          </div>
          {searchResults.length > 0 && (
            <div>
              <ul>
                {searchResults.map((game) => (
                  <li key={game.id}>
                    <button
                      className="ring-2 m-1 p-1 hover:bg-blue-400 hover:ring-cyan-300 text-black  dark:text-white  dark:ring-white !border-none outline-none focus:outline-none w-[10vw]"
                      onClick={(e) => {
                        e.preventDefault();
                        handleGameClick(game);
                      }}
                    >
                      {game.game_name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <textarea
            placeholder="Description"
            className="ring-4 p-1 ring-black bg-white dark:bg-black dark:ring-white !border-none outline-none focus:outline-none w-[15vw]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="text"
            className="ring-4 p-1 ring-black bg-white dark:bg-black dark:ring-white !border-none outline-none focus:outline-none w-[15vw]"
            placeholder="Media"
            value={media}
            onChange={(e) => setMedia(e.target.value)}
            required
          />
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <button
            type="submit"
            className="rounded-2xl ring-4 p-1 ring-black bg-white dark:bg-black dark:ring-white w-[10vw] hover:bg-blue-400"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}
export default CreatePost;
