import { useCallback, useEffect, useRef, useState } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddMovieCategory = ({ setShowAddMovie, showAddMovie }) => {
  const [sliders, setSliders] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    posterStyle: "",
    movieIds: [],
  });
  const [titleSearch, setTitleSearch] = useState("");
  const navigate = useNavigate();
  const formRef = useRef(null);

  const fetchData = useCallback(() => {
    try {
      const db = getDatabase();
      const starCountRef = ref(db, "movies/");
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const arrayOfObjects = Object.keys(data).map((key) => ({
            options: data[key].title + ` ( ${key} )`,
            id: key,
          }));
          setSliders(arrayOfObjects);
        } else {
          setSliders(null);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIdSelect = (id, option) => {
    setFormData((prev) => {
      const newMovieIds = [...prev.movieIds];
      if (newMovieIds.includes(id)) {
        return {
          ...prev,
          movieIds: newMovieIds.filter((movieId) => movieId !== id),
        };
      } else {
        // Add the selected movie
        return {
          ...prev,
          movieIds: [...newMovieIds, id],
        };
      }
    });

    setTitleSearch((prev) => {
      const selectedMovies = sliders.filter((item) =>
        formData.movieIds.includes(item.id)
      );
      if (selectedMovies.some((item) => item.id === id)) {
        return selectedMovies
          .filter((item) => item.id !== id)
          .map((item) => item.options)
          .join(", ");
      } else {
        return [...selectedMovies, { id, option }]
          .map((item) => item.options)
          .join(", ");
      }
    });
  };
  useEffect(() => {
    const selectedMovies = sliders?.filter((item) =>
      formData.movieIds.includes(item.id)
    );
    if (selectedMovies) {
      setTitleSearch(selectedMovies.map((item) => item.options).join(", "));
    }
  }, [formData.movieIds, sliders]);
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsAdding(true);
    if (!formData.movieIds.length) return;
    const { title, ...rest } = formData;
    try {
      const db = getDatabase();
      set(ref(db, "categories/" + title), rest);
      const options = { timeZone: "Asia/Dubai" };
      set(
        ref(db, "lastUpdated/time"),
        new Date().toLocaleString("en-US", options)
      );
      toast.success("Movie category added successfully");
      navigate("/Movies/movie-categories");
      setIsAdding(false);
      setTitleSearch("");
      formRef.current.reset();
      setFormData({ title: "", subtitle: "", posterStyle: "", movieIds: [] });
    } catch (error) {
      console.log(error);
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen flex px-4 md:px-6 lg:mt-0 300px:mt-14 flex-col py-5 sm:py-8">
      <div className="flex items-center justify-between">
        <h1 className="my-4 font-semibold dark:text-[#FDFDFD] text-[black] sm:text-lg md:text-2xl 300px: text-lg">
          Add Movie Category
        </h1>
        <button
          onClick={() => navigate("/Movies/movie-categories")}
          className="text-white bg-[black] font-medium dark:border-[#FDFDFD] py-1 px-4 rounded-lg"
        >
          Back
        </button>
      </div>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <div className="grid md:grid-cols-2  gap-12 border dark:border-gray-700 bg-white dark:bg-[#33343886] p-4 rounded-lg w-full">
          <div className="flex flex-col gap-2">
            <label className="text-black dark:text-[#FDFDFD] font-semibold">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="text-slate-400 bg-transparent border w-full dark:text-[#FDFDFD] dark:placeholder:text-[#FDFDFD] px-3 rounded-lg p-3"
              required
              placeholder="Drama Movies"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black dark:text-[#FDFDFD] font-semibold">
              Subtitle
            </label>
            <input
              type="text"
              name="subtitle"
              className="text-slate-400 bg-transparent border w-full dark:text-[#FDFDFD] dark:placeholder:text-[#FDFDFD] px-3 rounded-lg p-3"
              placeholder="Latest Drama movies By Our Editors"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black dark:text-[#FDFDFD] font-semibold">
              Poster Style
            </label>
            <select
              type="text"
              name="posterStyle"
              className="text-slate-400 bg-transparent border w-full dark:text-[#FDFDFD] dark:placeholder:text-[#FDFDFD] px-3 rounded-lg p-3"
              required
              onChange={handleInputChange}
              value={formData.posterStyle}
            >
              <option className="text-slate-400" value="">
                Select Poster Style
              </option>
              <option value="Large">Large</option>
              <option value="Small">Small</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black dark:text-[#FDFDFD] font-semibold">
              Movie TMDB ID
            </label>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Movies Available"
                className="text-slate-400 dark:text-[#FDFDFD] bg-transparent dark:bg-[#333438] border border-[#C8C8C8] px-3 rounded-lg w-full py-3"
                onFocus={() =>
                  document.getElementById("dropdown").classList.remove("hidden")
                }
                onBlur={() =>
                  setTimeout(
                    () =>
                      document
                        .getElementById("dropdown")
                        .classList.add("hidden"),
                    200
                  )
                }
                value={titleSearch}
                required
              />
              <div
                id="dropdown"
                className="dropdown-content hidden absolute w-full bg-white shadow-lg rounded-lg mt-1 max-h-60 overflow-auto"
              >
                {sliders?.map((item) => (
                  <a
                    key={item.id}
                    href="#!"
                    onClick={() => handleIdSelect(item.id, item.options)}
                    className="block px-4 py-2 dark:text-white dark:bg-[#29292D] bg-white text-[#29292D]"
                  >
                    {item.options}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-5">
          <button
            disabled={!formData.movieIds.length}
            className="dark:border-[#FDFDFD] cursor-pointer bg-black border border-black px-4 py-2 text-white rounded-lg"
          >
            Add Movie Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovieCategory;
