import { useContext, useEffect, useState } from "react";
import EditPopupHeader from "./EditPopupHeader";
import EditSeasonDetails from "./EditSeasonDetails";
import TitleInputs from "./TitleInputs";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { DarkModeContext } from "../../../../context/darkModeContext";
import { toast } from "react-toastify";

const EditTvShow = ({ setShowEditPopup, showToEdit, onEdit }) => {
  const [shows, setShows] = useState([]);
  const db = getDatabase();
  const starCountRef = ref(db, "shows/" + showToEdit);
  const { setOpen, setToastMessage } = useContext(DarkModeContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = () => {
      let updateData;
      try {
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            data.seasons.forEach((season) => {
              season.episodes.forEach((episode) => {
                episode.links.forEach((link) => {
                  if (!link.id) {
                    link.id = uuidv4();
                  }
                });

                if (!episode.id) {
                  episode.id = uuidv4();
                }
              });
              if (!season.id) {
                season.id = uuidv4();
              }
            });
            if (!data.id) {
              updateData = [{ ...data, "TMDB ID": showToEdit, id: uuidv4() }];
            } else {
              updateData = [{ ...data, "TMDB ID": showToEdit }];
            }
            console.log(updateData);
            setShows(updateData);
          } else {
            setShows([]);
            console.log("No data available");
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [db, showToEdit]);

  const addEpisode = (showIndex, id) => {
    const newShows = [...shows];
    const newEpisode = {
      id: uuidv4(),
      links: [{ host: "", quality: "", size: "", url: "", id: uuidv4() }],
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
    const newShows = [{ ...shows[i], [name]: value }];
    setShows(newShows);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/TvShows/All-TvShows");
    const db = getDatabase();
    const updates = {};
    updates["shows/" + showToEdit] = null;
    updates["shows/" + shows[0]["TMDB ID"]] = shows[0];
    toast.success(`TMDB ID (${shows[0]["TMDB ID"]}) Updated Successfully`);
    const options = { timeZone: "Asia/Dubai" };
    updates["lastUpdated/time"] = new Date().toLocaleString("en-US", options);
    setShowEditPopup(false);
    onEdit();
    return update(ref(db), updates);
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
    <div className="fixed bg-[#d9d9d96c] dark:bg-[#3334380f] z-30 px-4 w-[100%] left-0 top-0 h-full flex items-center justify-center">
      <div className="bg-white dark:bg-[#0F0F0F] rounded-xl lg:mt-0 300px:mt-16 300px:max-h-[80%] 500px:max-h-[90%] overflow-scroll no-scrollbar w-full md:w-3/5 lg:w-1/2">
        <EditPopupHeader
          setShowEditPopup={setShowEditPopup}
          title="Edit Tv Show"
        />
        {shows?.map((show, i) => {
          return (
            <form
              onSubmit={handleSubmit}
              key={show.id}
              className="p-4 max-h-[90svh] overflow-auto flex flex-col "
            >
              <TitleInputs
                show={show}
                i={i}
                handleUniqueInputChange={handleUniqueInputChange}
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
                  className="border-[1.5px] border-[#1D1C1C] text-white dark:border-[#FDFDFD] bg-[#1D1C1C] dark:bg-[#333438] rounded-xl font-medium text-sm px-12 py-2 flex gap-1 md:w-[25%] 500px:w-[30%] 300px:w-[40%] items-center justify-center"
                >
                  Submit
                </button>
              </div>
            </form>
          );
        })}
      </div>
    </div>
  );
};

export default EditTvShow;
