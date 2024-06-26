import EditMoviePopupHeader from "./EditMoviePopupHeader";
import EditMovieDetails from "./EditMovieDetails";
import MovieTitleInputs from "./MovieTitleInputs";
import { useContext, useEffect, useState, useCallback } from "react";
import { getDatabase, ref, onValue, update, get } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { DarkModeContext } from "../../../context/darkModeContext";
import { toast } from "react-toastify";

const EditMovie = ({ setShowEditPopup, showToEdit }) => {
  const [shows, setShows] = useState([]);
  const db = getDatabase();
  const starCountRef = ref(db, "movies/" + showToEdit);
  const { setOpen, setToastMessage } = useContext(DarkModeContext);

  useEffect(() => {
    const fetchData = () => {
      try {
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            if (data.links) {
              data.links = data.links.map((link) => {
                if (!link.id) {
                  link.id = uuidv4();
                }
                return link;
              });
            }
            if (!data.id) {
              data.id = uuidv4();
            }
            data["TMDB ID"] = showToEdit;
            setShows([data]);
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

  const handleDeleteLink = (showIndex, linkId) => {
    setShows((prevShows) => {
      const newShows = prevShows.map((show, index) => {
        if (index === showIndex) {
          return {
            ...show,
            links: show.links.filter((link) => link.id !== linkId),
          };
        }
        return show;
      });
      return newShows;
    });
  };

  const addLink = useCallback((showIndex) => {
    setShows((prevShows) => {
      const newShows = prevShows.map((show, index) => {
        if (index === showIndex) {
          return {
            ...show,
            links: [
              ...show.links,
              {
                id: uuidv4(),
                host: "",
                size: "",
                quality: "",
                url: "",
              },
            ],
          };
        }
        return show;
      });
      return newShows;
    });
  }, []);

  const handleInputChange = (event, showIndex, linkId, field) => {
    const { value } = event.target;
    setShows((prevShows) => {
      const newShows = [...prevShows];
      const show = newShows[showIndex];
      const link = show.links.find((link) => link.id === linkId);
      if (link) {
        link[field] = value;
      }
      return newShows;
    });
  };

  const handleUniqueInputChange = (i, event) => {
    const { name, value } = event.target;
    setShows((prevShows) => {
      const newShows = [...prevShows];
      newShows[i] = { ...newShows[i], [name]: value };
      return newShows;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const db = getDatabase();
    const updates = {};
    const tmdbId = shows[0]["TMDB ID"];
  
    try {
      // Fetch all movies from the database
      const moviesRef = ref(db, "movies");
      const snapshot = await get(moviesRef);
      if (snapshot.exists()) {
        const movies = snapshot.val();
        const existingMovies = Object.values(movies).filter(movie => movie["TMDB ID"] !== showToEdit);
  
        // Check if TMDB ID already exists in other records
        const tmdbIdExists = existingMovies.some(movie => movie["TMDB ID"] === tmdbId);
  
        if (tmdbIdExists) {
          // TMDB ID already exists, show toast message
          toast.error(`TMDB ID (${tmdbId}) already exists. Update failed.`);
        } else {
          // TMDB ID does not exist, proceed with update
          updates["movies/" + showToEdit] = null;
          updates["movies/" + tmdbId] = shows[0];
  
          const options = { timeZone: "Asia/Dubai" };
          updates["lastUpdated/time"] = new Date().toLocaleString("en-US", options);
  
          // Perform update
          await update(ref(db), updates);
          setShowEditPopup(false);
          toast.success(`TMDB ID (${tmdbId}) Updated Successfully`);
        }
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error checking TMDB ID:", error);
    }
  };
  
  

  return (
    <div className="fixed bg-[#d9d9d931] dark:bg-[#33343836] z-30 px-4 w-[100%] left-0 top-0 h-full flex items-center justify-center">
      <div className="bg-white dark:bg-[#0F0F0F] rounded-xl lg:mt-0 300px:mt-16 300px:max-h-[80%] 500px:max-h-[90%] overflow-scroll no-scrollbar w-full md:w-3/5 lg:w-1/2">
        <EditMoviePopupHeader setShowEditPopup={setShowEditPopup} />
        <form onSubmit={handleSubmit}>
          {shows.map((show, i) => (
            <div key={show.id} className="p-4 max-h-[90svh] overflow-auto">
              <MovieTitleInputs
                show={show}
                i={i}
                handleUniqueInputChange={handleUniqueInputChange}
              />
              <EditMovieDetails
                show={show}
                handleDeleteLink={handleDeleteLink}
                i={i}
                addLink={addLink}
                handleInputChange={handleInputChange}
              />
            </div>
          ))}
          <div className="p-4">
            <button
              type="submit"
              className="dark:text-[#FDFDFD] dark:bg-[#333438] bg-black text-white py-2 px-4 rounded-xl"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovie;
