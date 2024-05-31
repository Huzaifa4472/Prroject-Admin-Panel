import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue, set, get, child } from "firebase/database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCaretDown } from "react-icons/fa6";

const SliderDropdown = () => {
  const [sliders, setSliders] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [titleSearch, setTitleSearch] = useState("");
  const [tmdbId, setTmdbId] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const fetchData = useCallback(() => {
    const db = getDatabase();
    const moviesRef = ref(db, "movies/");
    onValue(moviesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arrayOfObjects = Object.keys(data).map((key) => ({
          "TMDB ID": key,
          title: data[key].title,
        }));
        setSliders(arrayOfObjects);
      } else {
        setSliders([]);
      }
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsAdding(true);

    const dbRef = ref(getDatabase());
    get(child(dbRef, `slider/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const sliderData = snapshot.val();
          const existingTmdbIds = sliderData.tmdbIds || [];

          const isMovieAlreadyInSlider = existingTmdbIds.some(
            (movie) => movie["TMDB ID"] === tmdbId
          );

          if (!isMovieAlreadyInSlider) {
            existingTmdbIds.push({ "TMDB ID": tmdbId, title: titleSearch });
            const db = getDatabase();
            set(ref(db, "slider/tmdbIds"), existingTmdbIds);

            const options = { timeZone: "Asia/Dubai" };
            set(
              ref(db, "lastUpdated/time"),
              new Date().toLocaleString("en-US", options)
            );

            toast.success("Movie added successfully!");
          } else {
            toast.info("Movie is already in the slider.");
          }

          setIsAdding(false);
          setTmdbId("");
          setTitleSearch("");
        } else {
          console.log("No slider data available");
          setIsAdding(false);
        }
      })
      .catch((error) => {
        console.error(error.message);
        toast.error("An error occurred while adding the movie.");
        setIsAdding(false);
      });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTitleSearch(value);
    setShowDropdown(true);

    const selectedMovie = sliders.find(
      (movie) => movie.title.toLowerCase() === value.toLowerCase()
    );

    if (selectedMovie) {
      setTmdbId(selectedMovie["TMDB ID"]);
    } else {
      setTmdbId("");
    }
  };

  const handleMovieSelect = (movie) => {
    setTitleSearch(movie.title);
    setTmdbId(movie["TMDB ID"]);
    setShowDropdown(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap gap-4 items-center justify-between w-full bg-white rounded-xl px-4 py-2 dark:text-[#FDFDFD] dark:bg-[#333438]">
        <h1 className="mr-auto">Movie TMDB ID:</h1>
        <div className="relative grow">
          <div className="relative">
            <input
              type="text"
              value={titleSearch}
              onChange={handleInputChange}
              onFocus={() => setShowDropdown(true)}
              className="w-full md:w-1/2 bg-gray-100 px-4 py-2 mr-0 ml-auto block outline-none rounded-md border-[1.5px] border-gray-200 dark:bg-[#333438]"
              placeholder="Movies Available"
            />
            <FaCaretDown className="absolute text-gray-500 right-2 top-3" />
            {showDropdown && (
              <div className="absolute top-full w-full md:w-1/2 right-0 bg-white border border-gray-300 z-10 max-h-60 overflow-y-auto dark:bg-[#333438]">
                {sliders.map((movie) => (
                  <p
                    key={movie["TMDB ID"]}
                    className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-[#575963]"
                    onClick={() => handleMovieSelect(movie)}
                  >
                    {movie.title}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        type="submit"
        disabled={!tmdbId || isAdding}
        className={`my-4 text-white px-4 py-2 rounded-md mr-0 ml-auto block ${
          !tmdbId || isAdding ? "bg-slate-400" : "bg-black"
        }`}
      >
        {isAdding ? "Adding..." : "Add Slider"}
      </button>
    </form>
  );
};

export default SliderDropdown;
