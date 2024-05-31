import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { MdOutlineLiveTv } from 'react-icons/md';
import { PiFilmSlateThin } from 'react-icons/pi';
import { FaAngleDown } from 'react-icons/fa6';
import { GoGear } from 'react-icons/go';
import { BsSliders } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import SettingsDropdown from './SettingsDropdown';
import MoviesDropdown from './MoviesDropdown';
import TvDropdown from './TvDropdown';
import LightDarkThemeButtton from './LightDarkThemeButtton';
import { IoMdMenu } from 'react-icons/io';

const SideNav = () => {
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showTvDropdown, setShowTvDropdown] = useState(false);
  const [showMoviesDropdown, setShowMoviesDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleSettingsDropdown = () => {
    setShowSettingsDropdown((prev) => !prev);
  };

  const toggleTvDropdown = () => {
    setShowTvDropdown((prev) => !prev);
  };

  const toggleMoviesDropdown = () => {
    setShowMoviesDropdown((prev) => !prev);
  };

  const toggleSidebar = (e) => {
    e.stopPropagation();
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-black text-white flex justify-end rounded-b-lg px-6 py-4 lg:hidden z-20">
        {!showSidebar ? (
          <IoMdMenu size={35} onClick={toggleSidebar} />
        ) : (
          <IoClose size={35} onClick={toggleSidebar} />
        )}
      </div>
      <div
        ref={sidebarRef}
        className={`fixed top-[58px] lg:top-0 left-0 bottom-0 flex flex-col text-white bg-black p-4 rounded-r-md w-4/5 md:w-[280px] overflow-auto z-20 ${
          showSidebar
            ? 'translate-x-0 ease-in-out'
            : '-translate-x-[100%] lg:-translate-x-0 ease-in-out'
        }`}
      >
        <h1 className="text-center px-3 py-4 first:text-lg  lg:text-3xl font-bold ">
          OFOO Panel
        </h1>
        <ul className="flex flex-col gap-4 font-medium ">
          <Link
            className={`text-white hover:bg-white hover:text-black hover:font-semibold dark:hover:bg-[#333438] dark:hover:text-[#FDFDFD] flex items-center px-2 py-[10px] gap-3  rounded-md ${
              window.location.pathname.includes('/TvShows') ||
              window.location.pathname.includes('/Movies') ||
              window.location.pathname.includes('/slider') ||
              window.location.pathname.includes('/settings')
                ? 'text-black'
                : 'text-black dark:bg-[#333438] dark:text-[#FDFDFD] font-semibold'
            }`}
            to="/"
          >
            <RxDashboard />
            Dashboard
          </Link>

          <div
            onClick={toggleTvDropdown}
            className={` cursor-pointer flex-col  flex `}
          >
            <li
              className={`flex hover:bg-white dark:hover:bg-[#333438] dark:hover:text-[#FDFDFD] hover:text-black hover:font-semibold py-[10px] px-2 items-center justify-between rounded-md  ${
                window.location.pathname.includes('/TvShows')
                  ? 'bg-white dark:bg-[#333438] dark:text-[#FDFDFD] text-black font-semibold '
                  : 'text-white'
              }`}
            >
              <Link
                to="/TvShows/All-TvShows"
                className="flex items-center gap-3"
              >
                <MdOutlineLiveTv />
                TV Shows
              </Link>
              <FaAngleDown
                className={`${showTvDropdown ? 'rotate-180' : ''}`}
              />
            </li>
            {showTvDropdown && <TvDropdown />}
          </div>

          <div
            onClick={toggleMoviesDropdown}
            className={` cursor-pointer flex-col flex `}
          >
            <li
              className={`flex hover:bg-white dark:hover:bg-[#333438] dark:hover:text-[#FDFDFD] hover:text-black hover:font-semibold py-[10px] px-2 items-center justify-between rounded-md  ${
                window.location.pathname.includes('/Movies')
                  ? 'bg-white dark:bg-[#333438] dark:text-[#FDFDFD] text-black font-semibold '
                  : 'text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <PiFilmSlateThin />
                Movies
              </div>
              <FaAngleDown
                className={`${showMoviesDropdown ? 'rotate-180' : ''}`}
              />
            </li>
            {showMoviesDropdown && <MoviesDropdown />}
          </div>
          <Link
            className={`flex dark:hover:bg-[#333438] dark:hover:text-[#FDFDFD] hover:bg-[white] hover:text-black hover:font-semibold  py-[10px] px-2 items-center gap-3 rounded-md ${
              window.location.pathname.includes('/slider')
                ? 'bg-white dark:bg-[#333438] dark:text-[#FDFDFD] text-black font-semibold '
                : 'text-white'
            }`}
            to="/slider"
          >
            <BsSliders />
            Slider       
          </Link>
          <div
            onClick={toggleSettingsDropdown}
            className={` cursor-pointer flex-col  flex `}
          >
            <li
              className={`flex  hover:bg-[white] hover:text-black dark:hover:bg-[#333438] dark:hover:text-[#FDFDFD] hover:font-semibold  py-[10px] px-2 items-center justify-between rounded-md ${
                window.location.pathname.includes('/settings')
                  ? 'bg-white dark:bg-[#333438] dark:text-[#FDFDFD] text-black font-semibold '
                  : 'text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <GoGear />
                Settings
              </div>
              <FaAngleDown
                className={`${showSettingsDropdown ? 'rotate-180' : ''}`}
              />
            </li>
            {showSettingsDropdown && <SettingsDropdown />}
          </div>
        </ul>
        <br />
        <div className="mt-auto mb-6">
          <LightDarkThemeButtton />
        </div>
      </div>
    </>
  );
};

export default SideNav;
