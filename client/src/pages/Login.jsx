import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import GoogleOAuthButton from "../components/GoogleOAuthButton";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/users/login", {
        email: email,
        password: password,
      });

      if (res.data.error) {
        let jsxMessage = (
          <>
            <p className=" text-red-600">* {res.data.error}</p>
            <br />
          </>
        );
        setErrorMessage(jsxMessage);
        return;
      } else {
        setErrorMessage("");
        navigate("/homepage");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="m-0 absolute top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%]">
      <div className="flex flex-col gap-6 rounded-3xl border-8 place-items-center p-2 w-[22vw] border-black text-black dark:border-white dark:text-white">
        <div className="border-4 mt-1 rounded-3xl border-black dark:border-white p-4 w-[20vw]">
          <h1 className="text-[35px] mt-10 mb-12 italic font-bricks-sans">
            GamersUnited
          </h1>
          <form>
            <div className="mb-5">
              <input
                type="email"
                name="email"
                id="email"
                className="ring-4 ring-black bg-white dark:bg-black dark:ring-white w-[15vw] p-1 outline-none"
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
                placeholder="email"
                required
              />
            </div>
            <div className="mb-5">
              <input
                type="password"
                name="password"
                id="password"
                className="ring-4 ring-black bg-white dark:bg-black dark:ring-white w-[15vw] p-1 outline-none"
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
                placeholder="password"
                required
              />
            </div>
            <div>{errorMessage}</div>
            <button
              className="font-bold border-2 text-white bg-black border-black 
            dark:text-black dark:bg-white dark:border-white rounded-xl w-[10vw] hover:bg-blue-400"
              onClick={handleSubmit}
            >
              Login
            </button>
            <div className="flex mt-6">
              <div className="flex h-1 w-[8vw] self-center bg-black dark:bg-white me-2"></div>
              <div className="flex self-center">or</div>
              <div className="flex h-1 w-[8vw] self-center bg-black dark:bg-white ms-2"></div>
            </div>
          </form>

          <div className="login-google">
            <div>
              <Link to="http://13.250.98.203/api/users/auth/google">
                Google Login
              </Link>
            </div>
          </div>
        </div>

        <div className="border-4 rounded-3xl mb-1 border-black dark:border-white p-4 w-[20vw]">
          <h1>
            Don't have an account?{" "}
            <span>
              <Link to="/signup" className="text-blue-400">
                Sign up
              </Link>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
export default Login;
