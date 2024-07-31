//import logo from './logo.svg';
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupNext from "./pages/SignupNext";
import Interest from "./pages/Interest";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";
import Explore from "./pages/Explore";
import Message from "./pages/Message";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import Cookies from "js-cookie";
import ClickedPost from "./pages/ClickedPost";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/" || location.pathname.includes("signup")) {
      if (Cookies.get("username")) {
        navigate("/homepage");
      }
    } else {
      if (!Cookies.get("username")) {
        navigate("/");
      }
    }
  }, []);
  return (
    <div className="App bg-white text-black dark:bg-black dark:text-white min-h-screen max-h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/interest" element={<Interest />} />
        <Route path="/signup/next" element={<SignupNext />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/message" element={<Message />} />
        <Route path="/create" element={<Create />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:displayName" element={<Profile />} />
        <Route path="/feedPost/:displayName/:post" element={<ClickedPost />} />
      </Routes>
    </div>
  );
}

export default App;
