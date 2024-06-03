import { useContext, useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { DarkModeContext } from "../context/darkModeContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { AiOutlineLogout } from "react-icons/ai";
import Avatar from "../assets/Avatar.png";
import flag from "../assets/US-flag.png";
import ToggleSidebar from "./Sidebar/ToggleSidebar.jsx";
import { toast } from "react-toastify";
import { FilteredDataContext } from "../context/FilteredDataContext";

const Navbar = ({ handleSearch }) => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
        navigate("/sign-in");
        toast.success("Logout successful");
      })
      .catch((error) => {
        console.log("logout error");
      });
  };

  return (
    <nav className="mt-[74px] lg:mt-4 w-full shadow rounded-md bg-white dark:bg-[#333438]  px-12 py-3 container mx-auto flex items-center justify-between gap-2 z-10">
      <label className="text-[#4B465C] opacity-[80%] w-full flex items-center gap-2">
        <IoIosSearch size={26} className="dark:text-[#FDFDFD]" />
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          className="w-full outline-none dark:text-[#FDFDFD] bg-transparent"
        />
      </label>
      <div className="flex items-center gap-4">
        <button type="button" onClick={handleLogout}>
          <AiOutlineLogout
            className="text-[#1D1C1C] dark:text-[#FDFDFD]"
            size={26}
          />
        </button>

        {/* <ToggleSidebar /> */}
      </div>
    </nav>
  );
};

export default Navbar;
