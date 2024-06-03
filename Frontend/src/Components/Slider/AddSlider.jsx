import { useCallback, useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, get, child } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SliderDropdown from "./SliderDropdown";

const AddSlider = () => {
  const [sliders, setSliders] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [titleSearch, setTitleSearch] = useState("");
  const [tmdbId, setTmdbId] = useState("");
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

    const selectedMovie = sliders.find(
      (movie) => movie.title.toLowerCase() === value.toLowerCase()
    );

    if (selectedMovie) {
      setTmdbId(selectedMovie["TMDB ID"]);
    } else {
      setTmdbId("");
    }
  };

  return (
    <div className=" min-h-screen">
      <div className="flex gap-4 justify-between flex-wrap my-8  items-start">
        <h1 className=" text-black font-semibold text-2xl dark:text-[#FDFDFD]">
          Add Slider
        </h1>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="text-white bg-black px-6 py-2 text-base rounded-xl"
        >
          Back
        </button>
      </div>
      <SliderDropdown />
      {/* <h1 className="text-center text-gray-400 font-semibold text-4xl mt-4 mb-12">
        OR
      </h1> */}
      {/* <form onSubmit={handleSubmit}>
        <div className="rounded-xl bg-white px-8 py-4 shadow-lg dark:bg-[#333438]">
          <label
            htmlFor="titleSearch"
            className="text-[#363848] dark:text-[#FDFDFD] text-lg font-bold "
          >
            Movie Title
          </label>
          <input
            type="text"
            id="titleSearch"
            value={titleSearch}
            onChange={handleInputChange}
            className="outline-none my-3 px-4 py-2 rounded-lg border-[1px] border-[#C8C8C8] w-full placeholder:text-[#858585] dark:text-[#FDFDFD] bg-transparent"
            placeholder="Enter movie title"
          />
        </div>
        <div className="rounded-xl bg-white dark:bg-[#333438] px-8 py-4 shadow-lg mt-4">
          <label
            htmlFor="tmdbId"
            className="text-[#363848] dark:text-[#FDFDFD] text-lg font-bold"
          >
            Movie TMDB ID
          </label>
          <input
            type="text"
            id="tmdbId"
            value={tmdbId}
            onChange={(e) => setTmdbId(e.target.value)}
            className="outline-none my-3 px-4 py-2 rounded-lg border-[1px] border-[#C8C8C8] w-full bg-transparent placeholder:text-[#858585] dark:text-[#FDFDFD]"
            placeholder="Enter TMDB ID"
          />
        </div>
        <div className="flex gap-2 my-12 flex-wrap">
          <button
            type="submit"
            disabled={!tmdbId || isAdding}
            className="border-[1.5px] border-[#1D1C1C] dark:bg-[#333438] dark:border-[#FDFDFD] text-white bg-[#1D1C1C] rounded-xl font-medium text-sm px-12 py-2 flex gap-1 items-center justify-center"
          >
            {isAdding ? "Adding..." : "Add Slider"}
          </button>
        </div>
      </form> */}
    </div>
  );
};

export default AddSlider;
