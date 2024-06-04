import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaAngleUp } from "react-icons/fa6";
import { LiaEdit } from "react-icons/lia";
import Season from "./Season";
import { useState } from "react";
import EditTvShow from "./EditTvShow/EditTvShow";
import DeleteTvShow from "./DeleteTvShow/DeleteTvShow";

const TvShow = ({ filteredShows }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showToEdit, setShowToEdit] = useState(null);
  const [showToDelete, setShowToDelete] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleToggleExpandRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleDeleteCallback = (deletedShowId) => {
    const updatedShows = filteredShows.filter(
      (show) => show["TMDB ID"] !== deletedShowId
    );
    setShowToDelete(null);
    setShowDeletePopup(false);
  };

  const handleEditCallback = () => {
    setShowToEdit(null);
    setShowEditPopup(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredShows.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredShows.length / itemsPerPage);

  return (
    <div>
      {currentItems.map((show, index) => (
        <div
          key={show.id}
          className="bg-white dark:bg-[#333438] rounded-xl p-4 mb-4"
        >
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex justify-start 750px:gap-8 500px:gap-4 300px:gap-2  flex-wrap items-center grow">
              <li className="list-none font-normal text-base text-[#46494F] dark:text-[#FDFDFD] ">
                <span className="font-semibold text-[#000000] dark:text-[#FDFDFD] ">
                  TMDB ID
                </span>
                : {show["TMDB ID"]}
              </li>
              <li className="list-none font-normal text-base text-[#46494F] dark:text-[#FDFDFD] ">
                <span className="font-semibold text-[#000000] dark:text-[#FDFDFD]">
                  Title
                </span>
                : {show.title}
              </li>
              <li className="list-none font-normal text-base text-[#46494F] dark:text-[#FDFDFD] ">
                <span className="font-semibold text-[#000000] dark:text-[#FDFDFD]">
                  Season
                </span>
                : {show.seasons.length}
              </li>
            </div>

            <div className="flex justify-between 750px:gap-5 300px:gap-2 items-center">
              <button
                onClick={() => {
                  setShowToEdit(show["TMDB ID"]);
                  setShowEditPopup(true);
                }}
                className="flex gap-1 550px:rounded-xl 300px:rounded-lg justify-center items-center 550px:py-2 300px:py-1 px-3 border border-[#0F172A] text-[#0F172A] dark:text-[#FDFDFD] dark:border-[#FDFDFD]  font-semibold text-sm"
              >
                <LiaEdit className="text-2xl" />
                Edit
              </button>
              {showEditPopup && (
                <EditTvShow
                  showToEdit={showToEdit}
                  setShowEditPopup={setShowEditPopup}
                  onEdit={handleEditCallback}
                />
              )}
              <button
                className="flex gap-1 550px:rounded-xl 300px:rounded-lg items-center 550px:py-2 300px:py-1 550px:px-4 300px:px-1 border border-[#EC2626] text-[#EC2626] font-semibold text-sm"
                onClick={() => {
                  setShowToDelete(show["TMDB ID"]);
                  setShowDeletePopup(true);
                }}
              >
                <MdOutlineDeleteOutline className="text-[#EC2626] text-2xl" />
                Delete
              </button>
              {showDeletePopup && showToDelete === show["TMDB ID"] && (
                <DeleteTvShow
                  setShowDeletePopup={setShowDeletePopup}
                  categoryId={showToDelete}
                  type="shows"
                  onDelete={handleDeleteCallback}
                />
              )}

              <FaAngleUp
                onClick={() => handleToggleExpandRow(index)}
                className={`text-[#858585] cursor-pointer text-3xl grow ${
                  expandedRow === index ? "" : "rotate-180"
                }`}
              />
            </div>
          </div>
          {expandedRow === index && (
            <div>
              <hr className="bg-[#F5F6F8] border-none h-[1px] mt-4" />
              <Season show={show} />
            </div>
          )}
        </div>
      ))}
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

export default TvShow;
