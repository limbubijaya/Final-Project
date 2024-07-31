import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createEmailPass } from "../features/user/userSlice";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setErrorMessage(
        <div className="text-red-600">
          <p>* Please fill in all required fields.</p>
          <br />
        </div>
      );
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage(
        <div className="text-red-600">
          <p>* Password and Confirm Password Do Not Match!</p>
          <br />
        </div>
      );
      return;
    }

    const isValid = await dispatch(createEmailPass({ email, password }));

    if (isValid) {
      navigate("/signup/next");
    } else {
      setErrorMessage(
        <div className="text-red-600">
          <p>* Email is Already Being Used!</p>
          <br />
        </div>
      );
    }
  };

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] m-0">
      <div className="flex flex-col gap-6 rounded-3xl border-8 border-black dark:border-white text-black dark:text-white place-items-center p-2 w-[22vw]">
        <div className="border-4 mt-1 rounded-3xl border-black dark:border-white p-4 w-[20vw]">
          <h1 className="mt-10 mb-12 text-[35px] italic font-bricks-sans">
            GamersUnited
          </h1>
          <form>
            <div className="mb-5">
              <input
                type="email"
                name="email"
                id="email"
                className="w-[15vw] p-1 outline-none ring-4 ring-black bg-white dark:bg-black dark:ring-white"
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="email"
                required
              />
            </div>
            <div className="mb-5">
              <input
                type="password"
                name="password"
                id="password"
                className="w-[15vw] p-1 outline-none ring-4 ring-black bg-white dark:bg-black dark:ring-white"
                onChange={(e) => setPassword(e.currentTarget.value)}
                placeholder="password"
                required
              />
            </div>
            <div className="mb-5">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="w-[15vw] p-1 outline-none ring-4 ring-black bg-white dark:bg-black dark:ring-white"
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                placeholder="Confirm Password"
                required
              />
            </div>
            {errorMessage}
            <button
              className="w-[10vw] font-bold rounded-xl border-2 bg-black text-white border-black hover:bg-blue-400 dark:text-black dark:bg-white dark:border-white"
              onClick={handleSubmit}
            >
              Next
            </button>
            <div className="flex mt-6">
              <div className="flex h-1 w-[8vw] self-center bg-black dark:bg-white me-2"></div>
              <div className="flex self-center">or</div>
              <div className="flex h-1 w-[8vw] self-center bg-black dark:bg-white ms-2"></div>
            </div>
          </form>
          <button className="w-[10vw] mt-4 font-bold rounded-xl border-2 bg-black text-white border-black hover:bg-blue-400 dark:text-black dark:bg-white dark:border-white">
            Sign Up with Google
          </button>
        </div>
        <div className="border-4 mb-1 rounded-3xl border-black dark:border-white p-4 w-[20vw]">
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
};

export default Signup;
