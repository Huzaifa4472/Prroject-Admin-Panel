import AddPopupHeader from "./AddPopupHeader";
import { get, getDatabase, ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import TitleInputs from "../EditTvShow/TitleInputs";
import EditSeasonDetails from "../EditTvShow/EditSeasonDetails";
import { toast } from "react-toastify";

const AddTvShow = ({ setShowAddTvShowPopup, setShowAddTv }) => {
  const initialValues = {
    "TMDB ID": "",
    title: "",
    seasons: [
      {
        episodes: [
          {
            id: uuidv4(),
            links: [{ host: "", quality: "", size: "", url: "", id: uuidv4() }],
          },
        ],
        id: uuidv4(),
      },
    ],
    id: uuidv4(),
  };
  const [shows, setShows] = useState([initialValues]);

  const addEpisode = (showIndex, id) => {
    const newShows = [...shows];
    const newEpisode = {
      id: uuidv4(),
      links: [{ host: "", quality: "", size: "", url: "", id: uuidv4() }], // Initial link details
    };
    newShows[showIndex].seasons[id].episodes.push(newEpisode);
    setShows(newShows);
  };

  const addLink = (showIndex, episodeIndex, id) => {
    const newShows = [...shows];
    newShows[showIndex].seasons[id].episodes[episodeIndex].links.push({
      host: "",
      quality: "",
      size: "",
      url: "",
      id: uuidv4(),
    });
    setShows(newShows);
  };

  const handleInputChange = (
    event,
    rowIndex,
    episodeIndex,
    linkIndex,
    field,
    id
  ) => {
    const { value } = event.target;
    const newShows = [...shows];
    newShows[rowIndex].seasons[id].episodes[episodeIndex].links[linkIndex][
      field
    ] = value;
    setShows(newShows);
  };

  const handleUniqueInputChange = (i, event) => {
    const { name, value } = event.target;
    const newShows = [...shows];
    newShows[i] = { ...newShows[i], [name]: value };
    setShows(newShows);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!shows[0]["TMDB ID"].trim() || !shows[0].title.trim()) {
      toast.error("TMDB ID and title are required");
      return;
    }
    const db = getDatabase();
    const showId = shows[0]["TMDB ID"];
    // set(ref(db, "shows/" + showId), shows[0]);
    try {
      const showRef = ref(db, "shows");
      const snapshot = await get(showRef);
      if (snapshot.exists()) {
        const show = snapshot.val();
        const tmdbIdExists = Object.values(show).some(
          (show) => show["TMDB ID"] === showId
        );
        if (tmdbIdExists) {
          toast.error(
            `TMDB ID (${showId}) already exists. Cannot add duplicate.`
          );
        } else {
          await set(ref(db, "shows/" + showId), {
            ...shows[0],
            createdAt: Date.now(),
          });
          const options = { timeZone: "Asia/Dubai" };
          await set(
            ref(db, "lastUpdated/time"),
            new Date().toLocaleString("en-US", options)
          );
          if (!window.location.pathname.includes("/TV-shows/Add-TvShow"))
            setShowAddTv(false);
          toast.success(
            `New Tv Show (${shows[0]?.title}) with TMDB ID (${shows[0]["TMDB ID"]}) added successfully`
          );
          setShowAddTvShowPopup(false);
        }
      } else {
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
          `New movie (${shows[0].title}) with TMDB ID (${showId}) added successfully`
        );
        setShowAddTvShowPopup(false); // Hide the popup after successful form submission
        navigate("/Movies/All-movies");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const addSeason = (showIndex) => {
    const updatedShows = [...shows];
    updatedShows[showIndex].seasons.push({
      episodes: [
        {
          id: uuidv4(),
          links: [{ host: "", quality: "", size: "", url: "", id: uuidv4() }],
        },
      ],
      id: uuidv4(),
    });
    setShows(updatedShows);
  };

  const handleDeleteLink = (
    showIndex,
    episodeIndex,
    linkIndex,
    seasonIndex
  ) => {
    const newShows = [...shows];
    newShows[showIndex].seasons[seasonIndex].episodes[
      episodeIndex
    ].links.splice(linkIndex, 1);
    setShows(newShows);
  };
  const deleteEpisode = (showIndex, seasonIndex, episodeIndex) => {
    const newShows = [...shows];
    newShows[showIndex].seasons[seasonIndex].episodes.splice(episodeIndex, 1);
    setShows(newShows);
  };

  const deleteSeason = (showIndex, seasonIndex) => {
    const newShows = [...shows];
    newShows[showIndex].seasons.splice(seasonIndex, 1);
    setShows(newShows);
  };
  return (
    <div className="fixed bg-[#d9d9d954] dark:bg-[#3334388a]  z-30 px-4 w-[100%] left-0 top-0 h-full flex items-center justify-center">
      <div className="bg-white dark:bg-[#0F0F0F] rounded-xl lg:mt-0 300px:mt-16 300px:max-h-[87%] 500px:max-h-[100%] overflow-scroll no-scrollbar w-full md:w-4/5 lg:w-1/2">
        <AddPopupHeader setShowAddTvShowPopup={setShowAddTvShowPopup} />
        {shows?.map((show, i) => (
          <div key={show.id} className="p-4 max-h-[90svh] overflow-auto">
            <form onSubmit={handleSubmit}>
              <TitleInputs
                show={show}
                handleUniqueInputChange={handleUniqueInputChange}
                i={i}
              />
              <EditSeasonDetails
                show={show}
                i={i}
                addEpisode={addEpisode}
                handleInputChange={handleInputChange}
                addLink={addLink}
                addSeason={addSeason}
                handleDeleteLink={handleDeleteLink}
                deleteEpisode={deleteEpisode}
                deleteSeason={deleteSeason}
              />
              <div className="flex gap-2 flex-col md:flex-row">
                <button
                  type="submit"
                  className="border-[1.5px] border-[#1D1C1C] text-white dark:border-[#FDFDFD] bg-[#1D1C1C] dark:bg-[#333438] rounded-xl font-medium text-sm px-12 py-2 flex gap-1 items-center 300px:w-[50%] 500px:w-[25%] justify-center"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddTvShow;
