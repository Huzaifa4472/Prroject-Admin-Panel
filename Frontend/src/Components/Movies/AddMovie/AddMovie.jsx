import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import AddMoviePopupHeader from "./AddMoviePopupHeader";
import MovieTitleInputs from "./MovieTitleInputs";
import EditMovieDetails from "../EditMovies/EditMovieDetails";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddMovie = ({ setShowAddTvShowPopup, setShowAddMovie }) => {
  const navigate = useNavigate();
  const initialValues = {
    "TMDB ID": "",
    title: "",
    links: [{ host: "", quality: "", size: "", url: "", id: uuidv4() }],
    id: uuidv4(),
  };
  const [shows, setShows] = useState([initialValues]);
  const [showPopup, setShowPopup] = useState(true); // State to control popup visibility

  const handleInputChange = (event, showIndex, linkId, field) => {
    const { value } = event.target;
    setShows((prevShows) => {
      const newShows = [...prevShows];
      const linkIndex = newShows[showIndex].links.findIndex(
        (link) => link.id === linkId
      );
      newShows[showIndex].links[linkIndex][field] = value;
      return newShows;
    });
  };

  const handleUniqueInputChange = (i, event) => {
    const { name, value } = event.target;
    setShows((prevShows) => {
      const newShows = [...prevShows];
      newShows[i][name] = value;

      if (name === "TMDB ID" && shows.includes(value)) {
        toast.error("TMDB ID already exists");
      } else {
        return newShows;
      }
    });
  };

  const handleSubmit = async () => {
    navigate("/Movies/All-movies");
    if (!shows[0]["TMDB ID"].trim() || !shows[0].title.trim()) {
      toast.error("TMDB ID and title are required");
      return;
    }

    const db = getDatabase();
    const showId = shows[0]["TMDB ID"];
    try {
      await set(ref(db, "movies/" + showId), {
        ...shows[0],
        createdAt: Date.now(),
      });
      const options = { timeZone: "Asia/Dubai" };
      await set(
        ref(db, "lastUpdated/time"),
        new Date().toLocaleString("en-US", options)
      );
      toast.success(
        `New movie (${shows[0].title}) with TMDB ID (${shows[0]["TMDB ID"]}) added successfully`
      );
      setShowPopup(false); // Hide the popup after successful form submission
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleAddLink = (showIndex) => {
    const lastLink = shows[showIndex].links[shows[showIndex].links.length - 1];
    if (
      !lastLink.host &&
      !lastLink.quality &&
      !lastLink.size &&
      !lastLink.url
    ) {
      return toast.error("Please fill in all the input fields first.");
    }
    const newShows = [...shows];
    const newLink = {
      host: "",
      quality: "",
      size: "",
      url: "",
      id: uuidv4(),
    };
    newShows[showIndex].links.push(newLink);
    setShows(newShows);
  };

  const handleDeleteLink = (showIndex, linkId) => {
    setShows((prevShows) => {
      const newShows = [...prevShows];
      newShows[showIndex].links = newShows[showIndex].links.filter(
        (link) => link.id !== linkId
      );
      return newShows;
    });
  };

  return (
    <>
      {showPopup && (
        <div className="fixed bg-[#d9d9d96c] dark:bg-[#333438a0] z-30 px-4 w-[100%] left-0 top-0 h-full flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-[#0F0F0F] rounded-xl lg:mt-0 300px:mt-16 300px:max-h-[80%] 500px:max-h-[90%] overflow-scroll no-scrollbar w-full md:w-3/5 lg:w-1/2"
          >
            <AddMoviePopupHeader
              setShowAddTvShowPopup={setShowAddTvShowPopup}
            />
            {shows.map((show, i) => (
              <div key={show.id} className="p-4 max-h-[90svh] overflow-auto">
                <MovieTitleInputs
                  i={i}
                  show={show}
                  handleUniqueInputChange={handleUniqueInputChange}
                />
                <EditMovieDetails
                  show={show}
                  handleDeleteLink={handleDeleteLink}
                  i={i}
                  addLink={() => handleAddLink(i)}
                  handleInputChange={handleInputChange}
                />
              </div>
            ))}
            <div className="p-4">
              <button
                type="submit"
                className="border-[1.5px] border-[#1D1C1C] text-white dark:text-[#FDFDFD] dark:border-[#FDFDFD] bg-[#1D1C1C] rounded-xl font-medium text-sm px-12 py-2 flex gap-1 items-center"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddMovie;
