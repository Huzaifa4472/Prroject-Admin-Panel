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
      return newShows;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const db = getDatabase();
    const showId = shows[0]["TMDB ID"];
    try {
      await set(ref(db, "movies/" + showId), {
        ...shows[0],
        createdAt: Date.now(), // Adding createdAt timestamp
      });
      const options = { timeZone: "Asia/Dubai" };
      await set(
        ref(db, "lastUpdated/time"),
        new Date().toLocaleString("en-US", options)
      );
      toast.success(
        `New movie (${shows[0].title}) with TMDB ID (${shows[0]["TMDB ID"]}) added successfully`
      );
      navigate("/Movies/All-movies");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleAddLink = (showIndex) => {
    // Check if the last link is already an empty link
    const lastLink = shows[showIndex].links[shows[showIndex].links.length - 1];
    if (
      !lastLink.host &&
      !lastLink.quality &&
      !lastLink.size &&
      !lastLink.url
    ) {
      return;
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
    <div className="fixed bg-[#D9D9D9B2] dark:bg-[#33343886] z-30 px-4 w-[100%] left-0 top-0 h-full flex items-center justify-center">
      <div className="bg-white dark:bg-[#0F0F0F] rounded-xl w-full md:w-4/5 lg:w-1/2">
        <AddMoviePopupHeader setShowAddTvShowPopup={setShowAddTvShowPopup} />
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
              addLink={() => handleAddLink(i)} // Pass handleAddLink as a callback
              handleInputChange={handleInputChange}
            />
          </div>
        ))}
        <div className="p-4">
          <button
            onClick={handleSubmit}
            className="border-[1.5px] border-[#1D1C1C] text-white dark:text-[#FDFDFD] dark:border-[#FDFDFD] bg-[#1D1C1C] rounded-xl font-medium text-sm px-12 py-2 flex gap-1 items-center"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
