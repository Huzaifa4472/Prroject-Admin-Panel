import { useCallback, useEffect, useRef, useState } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddTvShowCategory = () => {
  const [sliders, setSliders] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    showIds: [],
    title: "",
    subtitle: "",
    posterStyle: "",
  });
  const [titleSearch, setTitleSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    try {
      const db = getDatabase();
      const starCountRef = ref(db, "shows/");
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const arrayOfObjects = Object.keys(data).map((key) => ({
            options: data[key].title + ` ( ${key} )`,
            id: key,
          }));
          setSliders(arrayOfObjects);
        } else {
          setSliders([]);
        }
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
      const newShowIds = [...prev.showIds];
      if (newShowIds.includes(id)) {
        return {
          ...prev,
          showIds: newShowIds.filter((showId) => showId !== id),
        };
      } else {
        return {
          ...prev,
          showIds: [...newShowIds, id],
        };
      }
    });

    setTitleSearch((prev) => {
      const selectedShows = sliders.filter((item) =>
        formData.showIds.includes(item.id)
      );
      if (selectedShows.some((item) => item.id === id)) {
        return selectedShows
          .filter((item) => item.id !== id)
          .map((item) => item.options)
          .join(", ");
      } else {
        return [...selectedShows, { id, option }]
          .map((item) => item.options)
          .join(", ");
      }
    });
  };

  useEffect(() => {
    const selectedShows = sliders?.filter((item) =>
      formData.showIds.includes(item.id)
    );
    if (selectedShows) {
      setTitleSearch(selectedShows.map((item) => item.options).join(", "));
    }
  }, [formData.showIds, sliders]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsAdding(true);
    if (!formData.showIds.length) return;
    const { title, ...rest } = formData;
    try {
      const db = getDatabase();
      set(ref(db, "tvcategories/" + title), rest);
      const options = { timeZone: "Asia/Dubai" };
      set(
        ref(db, "lastUpdated/time"),
        new Date().toLocaleString("en-US", options)
      );
      toast.success(`Shows Category (${title}) added successfully`);
      navigate("/TvShows/TvShows-categories");
      setIsAdding(false);
      setTitleSearch("");
      formRef.current.reset();
      setFormData({ showIds: [], title: "", subtitle: "", posterStyle: "" });
    } catch (error) {
      toast.error(`(${error.message})`);
      setIsAdding(false);
      setTitleSearch("");
      setFormData({ showIds: [] });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white dark:bg-[#0F0F0F] my-12 rounded-xl flex px-4 md:px-6 flex-col py-5 sm:py-8">
      <div className="flex justify-between">
        <h1 className="my-4 text-base dark:text-[#FDFDFD] sm:text-lg md:text-3xl">
          Add TV Show Category
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-slate-950 transition-all duration-150 ease-in-out px-4 py-2 rounded-lg text-white font-bold sm:text-base text-sm border self-end"
        >
          {isAdding ? (
            <div className="flex items-center gap-2 py-2 bg-black dark:bg-[#333438]">
              <p>Back</p>
              <p className="loading loading-ring loading-lg"></p>
            </div>
          ) : (
            "Back"
          )}
        </button>
      </div>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mt-10 p-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg w-full">
          <div className="flex flex-col">
            <label className="text-black font-semibold dark:text-[#FDFDFD] ">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="text-black dark:text-[#FDFDFD]  dark:bg-[#333438] bg-transparent border border-[#C8C8C8] px-3 rounded-lg py-2"
              required
              placeholder="Drama Movies"
              onChange={handleInputChange}
              value={formData.title}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-black font-semibold dark:text-[#FDFDFD] ">
              Subtitle
            </label>
            <input
              type="text"
              name="subtitle"
              className="text-black bg-transparent dark:text-[#FDFDFD] dark:bg-[#333438] border border-[#C8C8C8] px-3 rounded-lg py-2"
              placeholder="Latest Drama movies By Our Editors"
              onChange={handleInputChange}
              required
              value={formData.subtitle}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-black font-semibold dark:text-[#FDFDFD] ">
              Poster Style
            </label>
            <select
              type="text"
              name="posterStyle"
              className="text-black bg-transparent dark:text-[#FDFDFD] dark:bg-[#333438] border border-[#C8C8C8] px-3 rounded-lg py-2"
              required
              onChange={handleInputChange}
              value={formData?.posterStyle || ""}
            >
              <option
                className="text-black bg-transparent dark:text-[#FDFDFD] dark:bg-[#333438]"
                value=""
              >
                Select Poster Style
              </option>
              <option value="style1">Large</option>
              <option value="style2">Small</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-black font-semibold dark:text-[#FDFDFD] ">
              Tv Show TMDB ID
            </label>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tv Shows Available"
                className="text-black dark:text-[#FDFDFD] dark:bg-[#333438] bg-transparent border border-[#C8C8C8] px-3 rounded-lg w-full py-2"
                onFocus={() =>
                  document.getElementById("dropdown").classList.remove("hidden")
                }
                value={titleSearch}
                readOnly
                required
              />
              <div
                id="dropdown"
                className="dropdown-content hidden absolute w-full bg-white shadow-lg rounded-lg mt-1 max-h-60 overflow-auto"
              >
                {sliders.map((item) => (
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
        <div className="flex flex-row flex-wrap-reverse items-center gap-5">
          <button
            type="submit"
            disabled={!formData.showIds.length}
            className="bg-slate-950 transition-all duration-150 ease-in-out px-4 py-2 rounded-lg text-white font-bold sm:text-base text-sm border self-end"
          >
            {isAdding ? (
              <div className="flex items-center gap-2 bg-black dark:bg-[#333438]">
                <p>Adding Tv Show Category</p>
                <p className="loading loading-ring loading-lg"></p>
              </div>
            ) : (
              "Add Tv Show Category"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTvShowCategory;
