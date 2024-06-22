import { useState, useContext, useCallback, useEffect } from "react";
import { MdOutlineDesktopWindows } from "react-icons/md";
import { HiMiniLink } from "react-icons/hi2";
import { RxDividerVertical } from "react-icons/rx";
import { RiSearchLine } from "react-icons/ri";
import { AiFillPlusCircle } from "react-icons/ai";
import { getDatabase, ref, onValue } from "firebase/database";
import DashboardCard from "../DashboardCard";
import AddMovie from "./AddMovie/AddMovie";
import MovieShow from "./MovieShow";
import { DarkModeContext } from "../../context/darkModeContext";
import Navbar from "../Navbar";
const TotalMovies = ({ setShowAddMovie, showAddMovie }) => {
  const [showAddTvShowPopup, setShowAddTvShowPopup] = useState(false);
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [showToEdit, setShowToEdit] = useState({});
  const [errorMesaage, setErrorMesaage] = useState("");
  const [totalLinks, setTotalLinks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const { setOpen } = useContext(DarkModeContext);

  const fetchData = useCallback(() => {
    const controller = new AbortController();
    const { signal } = controller;

    try {
      const db = getDatabase();
      const starCountRef = ref(db, "movies/");

      onValue(
        starCountRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const arrayOfObjects = Object.entries(data).map(([key, value]) => ({
              "TMDB ID": key,
              ...value,
            }));

            const linksNo = arrayOfObjects.reduce((totalLinks, item) => {
              totalLinks += item.links?.length || 0;
              return totalLinks;
            }, 0);
            setTotalLinks(linksNo);

            arrayOfObjects.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );

            setShows(arrayOfObjects);
            setFilteredShows(arrayOfObjects);
          } else {
            setTotalLinks(0);
            setShows([]);
            setFilteredShows([]);
            setErrorMesaage(
              "No Movies available to display. Try adding a Movie"
            );
          }
        },
        {
          signal, // Pass the signal to the listener
        }
      );

      return () => {
        controller.abort();
      };
    } catch (error) {
      setErrorMesaage(error.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };
  const handleSearch = debounce((e) => {
    const allData = [...shows];

    const filter = allData.filter(
      (show) =>
        show["TMDB ID"].includes(e.target.value) ||
        show.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredShows(filter.length ? filter : []);
  }, 300);

  const totalPages = Math.ceil(filteredShows.length / itemsPerPage);
  return (
    <div className="min-h-screen">
      <Navbar handleSearch={handleSearch} />
      <h1 className="text-2xl font-semibold text-black dark:text-[#FDFDFD] mt-4 mb-12">
        All Movies:
      </h1>
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        <DashboardCard
          title="Total Movies:"
          value={shows.length}
          icon={<MdOutlineDesktopWindows className="text-white" size={90} />}
        />
        <DashboardCard
          title="Total Links:"
          value={totalLinks || 0}
          icon={<HiMiniLink className="text-white" size={90} />}
        />
      </div>
      <div className="flex justify-end flex-wrap gap-4 my-8">
        <button
          onClick={() => setShowAddTvShowPopup(true)}
          className="font-medium 600px:text-base 300px:text-sm flex items-center gap-2 bg-[#1D1C1C] dark:bg-[#333438] text-[#ffff] 600px:px-4 300px:px-3 600px:py-3 300px:py-2 rounded-xl"
        >
          <AiFillPlusCircle size={22} />
          <p className="font-medium">Add New Movie</p>
        </button>
        {showAddTvShowPopup && (
          <AddMovie
            setShowAddMovie={setShowAddMovie}
            setOpen={setOpen}
            setShowAddTvShowPopup={setShowAddTvShowPopup}
            fetchData={fetchData}
          />
        )}
      </div>
      {filteredShows.length ? (
        <MovieShow
          filteredShows={filteredShows}
          shows={filteredShows}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          setshowToEdit={setShowToEdit}
          showToEdit={showToEdit}
        />
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No item matches
        </p>
      )}
      <div className="flex justify-center my-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 mx-1 ${
              currentPage === index + 1
                ? "bg-[#333438] text-white"
                : "bg-gray-300 text-black"
            } rounded`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TotalMovies;
