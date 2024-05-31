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

const TotalMovies = ({ setShowAddMovie, showAddMovie }) => {
  const [showAddTvShowPopup, setShowAddTvShowPopup] = useState(false);
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [showToEdit, setShowToEdit] = useState({});
  const [errorMesaage, setErrorMesaage] = useState("");
  const [totalLinks, setTotalLinks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const { setOpen } = useContext(DarkModeContext);

  const handleExpandRow = (rowIndex) => {
    setExpandedRow((prevRow) => (prevRow === rowIndex ? null : rowIndex));
  };

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

            console.log(data);

            const linksNo = arrayOfObjects.reduce((totalLinks, item) => {
              totalLinks += item.links?.length || 0;
              return totalLinks;
            }, 0);
            setTotalLinks(linksNo);

            // Sort the array by createdAt property
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

  const handleSearch = (e) => {
    const allData = [...shows];

    const filter = allData.filter(
      (show) =>
        show["TMDB ID"].includes(e.target.value) ||
        show.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (filter.length) {
      setFilteredShows(filter);
      setCurrentPage(1); // Reset to first page on search
      return;
    }
    setFilteredShows(allData);
    setCurrentPage(1); // Reset to first page on search
  };

  // Calculate the total pages for pagination
  const totalPages = Math.ceil(filteredShows.length / itemsPerPage);
  console.log(fetchData);
  return (
    <div className="min-h-screen">
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
      <div className="flex justify-between flex-wrap gap-4 my-8">
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
      <MovieShow
        shows={filteredShows}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setshowToEdit={setShowToEdit}
        showToEdit={showToEdit}
        filteredShows={filteredShows}
      />
      {/* Pagination controls */}
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
                ? "bg-gray-800 text-white"
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
