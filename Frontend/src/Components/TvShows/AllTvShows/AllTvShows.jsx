import { MdOutlineDesktopWindows } from "react-icons/md";
import { HiMiniLink } from "react-icons/hi2";
import { RxDividerVertical } from "react-icons/rx";
import { RiSearchLine } from "react-icons/ri";
import { AiFillPlusCircle } from "react-icons/ai";
import React, { useCallback, useContext, useEffect, useState } from "react";
import DashboardCard from "../../DashboardCard";
import AddTvShow from "./AddTvShow/AddTvShow";
import TvShow from "./TvShow";
import { DarkModeContext } from "../../../context/darkModeContext";
import { getDatabase, ref, onValue } from "firebase/database";
import { FilteredDataContext } from "../../../context/FilteredDataContext";

const AllTvShows = ({ showAddTv, setShowAddTv }) => {
  const { filteredShows: contextFilteredShows, shows: contextShows } =
    useContext(FilteredDataContext);
  const [showAddTvShowPopup, setShowAddTvShowPopup] = useState(false);
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const db = getDatabase();
  const [showToDelete, setShowToDelete] = useState();
  const [errorMesaage, setErrorMesaage] = useState("");
  const [totalLinks, setTotalLinks] = useState(0);
  console.log("show data", shows);
  const fetchData = useCallback(() => {
    const starCountRef = ref(db, "shows/");

    try {
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const arrayOfObjects = Object.keys(data).map((key) => ({
            "TMDB ID": key,
            ...data[key],
          }));

          console.log("Fetched data:", data); // Calculate total links
          const linksNo = arrayOfObjects.reduce((totalLinks, item) => {
            item.seasons.forEach((season) => {
              season.episodes.forEach((episode) => {
                totalLinks += episode.links?.length || 0;
              });
            });
            return totalLinks;
          }, 0);
          setTotalLinks(linksNo);

          // Sort shows based on createdAt attribute
          arrayOfObjects.sort((a, b) => b.createdAt - a.createdAt);
          console.log("Sorted shows:", arrayOfObjects);

          setShows(arrayOfObjects);
          setFilteredShows(arrayOfObjects);
        } else {
          setTotalLinks(0);
          setShows([]);
          setFilteredShows([]);
          setErrorMesaage(
            "No TV shows available to display. Try adding a TV show"
          );
        }
        console.log("Updated shows:", shows);
        console.log("Updated filtered shows:", filteredShows);
      });
    } catch (error) {
      setErrorMesaage(error);
    }
  }, [db]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setFilteredShows(contextFilteredShows);
  }, [contextFilteredShows]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleSearch = debounce((e) => {
    const allData = [...contextShows];

    const filter = allData.filter(
      (show) =>
        show["TMDB ID"].includes(e.target.value) ||
        show.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (filter.length) {
      setFilteredShows(filter);
    } else {
      setFilteredShows(allData);
    }
  }, 300);

  return (
    <div className=" min-h-screen ">
      <h1 className="text-2xl font-semibold text-black dark:text-[#FDFDFD] mt-4 mb-12">
        All Tv Shows:
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 w-full">
        <DashboardCard
          title="Total TV Shows:"
          value={shows?.length}
          icon={<MdOutlineDesktopWindows className="text-white" size={90} />}
        />
        <DashboardCard
          title="Total Links:"
          value={totalLinks}
          icon={<HiMiniLink className="text-white" size={90} />}
        />
      </div>
      <div className="flex gap-4 justify-between md:flex-row flex-col my-8">
        <div className="bg-white dark:bg-[#333438] text-[#858585] dark:text-[#FDFDFD] flex items-center justify-between px-8 py-3 rounded-xl w-full md:w-[34%]">
          <input
            type="text"
            onChange={(e) => handleSearch(e)}
            placeholder="Search something"
            className="outline-none placeholder:text-[13px] bg-transparent placeholder:text-[#858585] placeholder:font-normal w-full"
          />
          <RxDividerVertical />
          <RiSearchLine />
        </div>

        <button
          onClick={() => setShowAddTvShowPopup(true)}
          className="font-medium text-base flex items-center gap-2 bg-[#1D1C1C] dark:bg-[#333438] text-[#ffff] px-4 py-3 rounded-xl"
        >
          <AiFillPlusCircle size={22} />
          <p className="font-medium text-base">Add New Show</p>
        </button>
        {showAddTvShowPopup && (
          <AddTvShow
            setShowAddTvShowPopup={setShowAddTvShowPopup}
            setShowAddTv={setShowAddTv}
          />
        )}
      </div>
      <TvShow filteredShows={filteredShows} />
    </div>
  );
};

export default AllTvShows;
