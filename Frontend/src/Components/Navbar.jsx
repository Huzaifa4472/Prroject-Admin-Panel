import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../context/darkModeContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { IoIosSearch } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { AiOutlineLogout } from "react-icons/ai";
import Avatar from "../assets/Avatar.png";
import flag from "../assets/US-flag.png";
import ToggleSidebar from "./Sidebar/ToggleSidebar.jsx";
import { toast } from "react-toastify";
import { FilteredDataContext } from "../context/FilteredDataContext";

const Navbar = ({ handleSearch }) => {
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
    </nav>
  );
};

export default Navbar;
