import { MdOutlineDesktopWindows } from "react-icons/md";
import { HiMiniLink } from "react-icons/hi2";
import { AiFillPlusCircle } from "react-icons/ai";
import React, { useCallback, useContext, useEffect, useState } from "react";
import DashboardCard from "../../DashboardCard";
import AddTvShow from "./AddTvShow/AddTvShow";
import TvShow from "./TvShow";
import { DarkModeContext } from "../../../context/darkModeContext";
import {
  getDatabase,
  ref,
  onValue,
  query,
  orderByChild,
  set,
} from "firebase/database";
import { FilteredDataContext } from "../../../context/FilteredDataContext";
import Navbar from "../../Navbar";

const AllTvShows = ({ showAddTv, setShowAddTv }) => {
  // const { filteredShows: contextFilteredShows, shows: contextShows } =
  //   useContext(FilteredDataContext);
  const [showAddTvShowPopup, setShowAddTvShowPopup] = useState(false);
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const db = getDatabase();
  const [errorMesaage, setErrorMesaage] = useState("");
  const [totalLinks, setTotalLinks] = useState(0);
  const fetchData = useCallback(() => {
    const showsRef = ref(db, "shows/");
    const orderedQuery = query(showsRef, orderByChild("createdAt")); // Order by 'title' field

    try {
      onValue(orderedQuery, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const arrayOfObjects = Object.keys(data).map((key) => {
            let newObj = {
              "TMDB ID": key,
              ...data[key],
            };
            if (!data[key].createdAt) {
              newObj.createdAt = Date.now();
              set(ref(db, "shows/" + key), newObj);
            }
            return newObj;
          });
          console.log(data);
          const linksNo = arrayOfObjects.reduce((totalLinks, item) => {
            item.seasons.forEach((season) => {
              season.episodes.forEach((episode) => {
                totalLinks += episode.links?.length || 0;
              });
            });
            return totalLinks;
          }, 0);
          setTotalLinks(linksNo);
          arrayOfObjects.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );

          console.log("Sorated DATA", arrayOfObjects);
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
      });
    } catch (error) {
      setErrorMesaage(error.message);
    }
  }, [db]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // useEffect(() => {
  //   setFilteredShows(contextFilteredShows);
  // }, [contextFilteredShows]);

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

    setFilteredShows(filter.length ? filter : []);
  }, 300);
  console.log("filtered show", filteredShows);

  return (
    <div className=" min-h-screen ">
      <Navbar handleSearch={handleSearch} />
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
      <div className="flex gap-4  justify-end my-8">
        <button
          onClick={() => setShowAddTvShowPopup(true)}
          className="font-medium text-base  flex items-center gap-2 bg-[#1D1C1C] dark:bg-[#333438] text-[#ffff] px-4 py-2 rounded-xl"
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
      {filteredShows.length ? (
        <TvShow filteredShows={filteredShows} />
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No item matches
        </p>
      )}
    </div>
  );
};
export default AllTvShows;
