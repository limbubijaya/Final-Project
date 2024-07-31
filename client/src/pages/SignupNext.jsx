import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserThunk } from "../features/user/userSlice";

function SignupNext() {
  const [inputDisplayName, setInputDisplayName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("NA");
  const [media, setMedia] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        <div className="text-red-600">
          <p>
            * Media input must contain a link with either .png, .jpg, or .jpeg
            extension.!
          </p>
          <br />
        </div>
      );
      return;
    }
    console.log("bio", bio.media);
    try {
      const success = await dispatch(
        createUserThunk({
          display_name: displayName.toLowerCase(),
          bio: bio,
          profile_pic: media,
        })
      );

      if (success) {
        setDisplayName("");
        setBio("NA");
        setMedia("");
        setErrorMessage("");
        navigate("/homepage");
      } else {
        setErrorMessage(
          <div className="text-red-600">
            <p>* Please input a Display Name!</p>
            <br />
          </div>
        );
      }
    } catch (error) {
      setErrorMessage(
        <div className="text-red-600">
          <p>* An error occurred while creating the user. Please try again.</p>
          <br />
        </div>
      );
    }
  };

  const handleDisplayNameChange = async (e) => {
    const newDisplayName = e.currentTarget.value.toLowerCase();
    setInputDisplayName(newDisplayName);
    setDisplayName(newDisplayName);

    try {
      const response = await axios.post("/api/users/validDisplayName", {
        display_name: newDisplayName,
      });
      if (response.status !== 200 || !response.data.valid) {
        setErrorMessage(
          <div className="text-red-600">
            <p>
              * Display name already exists. Please choose a different name!
            </p>
            <br />
          </div>
        );
      } else {
        setErrorMessage("");
      }
    } catch (e) {
      setErrorMessage(
        <div className="text-red-600">
          <p>
            * An error occurred while checking the display name. Please try
            again!
          </p>
          <br />
        </div>
      );
    }
  };

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] m-0">
      <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border-8 p-2 w-[22vw] border-black text-black dark:border-white dark:text-white">
        <div className="rounded-3xl border-4 p-4 w-[20vw] border-black dark:border-white">
          <h1 className="mb-12 mt-10 text-[35px] font-bricks-sans italic">
            GamersUnited
          </h1>
          <form>
            <div className="mb-5">
              <input
                type="text"
                className="w-[15vw] rounded-xl ring-4 ring-black bg-white p-1 outline-none dark:bg-black dark:ring-white"
                placeholder="Media"
                value={media}
                onChange={(e) => setMedia(e.target.value)}
                required
              />
            </div>
            <div className="mb-5">
              <input
                type="text"
                name="display_name"
                id="display_name"
                className="w-[15vw] rounded-xl ring-4 ring-black bg-white p-1 outline-none dark:bg-black dark:ring-white"
                value={inputDisplayName}
                onChange={handleDisplayNameChange}
                placeholder="Display Name"
                required
              />
            </div>
            <div className="mb-5">
              <input
                type="text"
                name="bio"
                id="bio"
                className="w-[15vw] rounded-xl ring-4 ring-black bg-white p-1 outline-none dark:bg-black dark:ring-white"
                onChange={(e) => setBio(e.currentTarget.value)}
                placeholder="Bio"
              />
            </div>

            <div>{errorMessage}</div>
            <button
              className="w-[10vw] rounded-xl border-2 bg-black font-bold text-white border-black hover:bg-blue-400 dark:bg-white dark:text-black dark:border-white"
              onClick={handleSubmit}
            >
              Sign up
            </button>
            <div className="flex mt-6 items-center justify-center">
              <div className="h-1 w-[8vw] self-center bg-black dark:bg-white me-2"></div>
              <div className="self-center">or</div>
              <div className="h-1 w-[8vw] self-center bg-black dark:bg-white ms-2"></div>
            </div>
          </form>
          <button className="mt-4 w-[10vw] rounded-xl border-2 bg-black font-bold text-white border-black hover:bg-blue-400 dark:bg-white dark:text-black dark:border-white">
            Sign Up with Google
          </button>
        </div>
        <div className="rounded-3xl border-4 mb-1 p-4 w-[20vw] border-black dark:border-white">
          <h1>
            Already have an account?{" "}
            <span>
              <Link to="/" className="text-blue-400">
                Login
              </Link>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default SignupNext;
