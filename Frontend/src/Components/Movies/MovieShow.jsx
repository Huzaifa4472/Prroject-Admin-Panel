import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaAngleUp } from "react-icons/fa6";
import { LiaEdit } from "react-icons/lia";
import { useState } from "react";
import Episodes from "./Episodes";
import EditMovie from "./EditMovies/EditMovie";
import DeleteMovies from "./DeleteMovies/DeleteMovies";

const MovieShow = ({
  currentPage,
  itemsPerPage,
  setshowToEdit,
  showToEdit,
  filteredShows,
}) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showToDelete, setShowToDelete] = useState(null);
  const [showMovieStates, setShowMovieStates] = useState({});

  const handleDelOpenModal = (title, TMDB) => {
    setShowToDelete({ title, TMDB });
    setShowDeletePopup(true);
  };

  const toggleShowMovie = (id) => {
    setShowMovieStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedShows = filteredShows.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <div>
      {paginatedShows.map((show, index) => (
        <div key={index}>
          <div
            key={show["TMDB ID"]}
            className="bg-white dark:bg-[#333438] rounded-xl p-4 mb-4"
          >
            <div className="flex justify-between flex-wrap gap-4 items-center">
              <div className="flex gap-4 flex-wrap">
                <li className="flex font-normal text-sm text-[#46494F] dark:text-[#FDFDFD]">
                  <span className="font-semibold text-[#000000] dark:text-[#FDFDFD]">
                    TMDB ID:
                  </span>
                  &#160; {show["TMDB ID"]}
                </li>
                <li className="flex font-normal text-base text-[#46494F] dark:text-[#FDFDFD]">
                  <span className="font-semibold text-[#000000] dark:text-[#FDFDFD]">
                    Title:
                  </span>
                  &#160; {show.title}
                </li>
                <li className="flex font-normal text-base text-[#46494F] dark:text-[#FDFDFD]">
                  <span className="font-semibold text-[#000000] dark:text-[#FDFDFD]">
                    Links:
                  </span>
                  &#160; {show.links?.length}
                </li>
              </div>

              <div className="flex justify-center 750px:gap-5 300px:gap-2 items-center">
                <button
                  onClick={() => {
                    setshowToEdit(show["TMDB ID"]);
                    setShowEditPopup(true);
                  }}
                  className="flex gap-1 550px:rounded-xl 300px:rounded-lg items-center 550px:py-2 300px:py-1 px-4  border border-[#0F172A]  dark:border-[#FDFDFD]"
                >
                  <span className="text-[#1D1C1C] dark:text-[#FDFDFD] text-2xl">
                    <LiaEdit />
                  </span>
                  <p className="text-[#0F172A] dark:text-[#FDFDFD] 550px:block font-semibold text-sm">
                    Edit
                  </p>
                </button>
                <button
                  className="flex gap-1 550px:rounded-xl 300px:rounded-lg items-center 550px:py-2 300px:py-1 550px:px-4 300px:px-1 border border-[#EC2626] text-[#EC2626] font-semibold text-sm"
                  onClick={() => {
                    handleDelOpenModal(show.title, show["TMDB ID"]);
                  }}
                >
                  <MdOutlineDeleteOutline className="text-[#EC2626] text-2xl" />
                  <span className="550px:flex">Delete</span>
                </button>
                <FaAngleUp
                  onClick={() => toggleShowMovie(show["TMDB ID"])}
                  className={`text-[#858585] cursor-pointer text-3xl ${
                    showMovieStates[show["TMDB ID"]] ? "" : "rotate-180"
                  }`}
                />
              </div>
            </div>
            {showMovieStates[show["TMDB ID"]] && (
              <div>
                <hr className="bg-[#F5F6F8] border-none h-[1px] mt-4" />
                <Episodes show={show} />
              </div>
            )}
          </div>

          {showEditPopup && (
            <EditMovie
              showToEdit={showToEdit}
              setShowEditPopup={setShowEditPopup}
            />
          )}
          {showDeletePopup && (
            <DeleteMovies
              setShowDeletePopup={setShowDeletePopup}
              showToDelete={showToDelete}
              type="movies"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MovieShow;
