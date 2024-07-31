import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiShutDownLine } from "react-icons/ri";
import Cookies from "js-cookie";

function Nav() {
  const displayName = Cookies.get("username");
  const name = displayName
    ? displayName[0].toUpperCase() + displayName.slice(1, displayName.length)
    : "";
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("username");
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-6 border-r-2 place-items-center p-4 w-[15vw]  border-black text-black dark:border-white dark:text-white h-[100vh]">
      <div className="flex flex-col place-items-center gap-6 p-8">
        <Link to={"/homepage"}>
          <h1 className="text-[35px] mt-10 mb-12 italic font-bricks-sans">
            GamersUnited
          </h1>
        </Link>
        <Link to={"/homepage"}>
          <div className="flex gap-2 p-2 place-items-center rounded-3xl hover:ring-2  ring-blue-400">
            <FaHome className="size-[2vw]" />
            <h1 className="text-[1vw]">Home</h1>
          </div>
        </Link>
        <Link to={"/search"}>
          <div className="flex gap-2 p-2 place-items-center rounded-3xl hover:ring-2  ring-blue-400">
            <FaSearch className="size-[1.6vw]" />
            <h1 className="text-[1vw]">Search</h1>
          </div>
        </Link>
        <Link to={"/explore"}>
          <div className="flex gap-2 p-2 place-items-center rounded-3xl hover:ring-2  ring-blue-400">
            <MdOutlineExplore className="size-[2vw]" />
            <h1 className="text-[1vw] ">Explore</h1>
          </div>
        </Link>
        <Link to={"/message"}>
          <div className="flex gap-2 p-2 place-items-center rounded-3xl hover:ring-2  ring-blue-400">
            <BiMessageDetail className="size-[1.8vw]" />
            <h1 className="text-[1vw] ">Message</h1>
          </div>
        </Link>
        <Link to={"/create"}>
          <div className="flex gap-2 p-2 place-items-center rounded-3xl hover:ring-2  ring-blue-400">
            <IoMdAddCircleOutline className="size-[2vw]" />
            <h1 className="text-[1vw] ">Create</h1>
          </div>
        </Link>
      </div>
      <div className=" flex-grow "></div>

      <div className="flex items-center">
        <div className="mr-2 w-[3vw]">
          <RiShutDownLine
            className="size-[2.5vw] p-2 rounded-3xl hover:ring-2  ring-blue-400"
            onClick={handleLogout}
          />
        </div>
        <h1 className="w-[7vw] text-2xl">
          <Link to={`/profile/${displayName}`}>{name}</Link>
        </h1>
      </div>
    </div>
  );
}
export default Nav;
