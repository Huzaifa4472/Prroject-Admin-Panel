import { useCallback, useEffect, useRef, useState } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TiDelete } from "react-icons/ti";
import { RiCheckLine } from "react-icons/ri"; // Import the check mark icon

const EditMovieCategories = ({
  setShowEditMovieCategories,
  initialData,
  onEditSuccess,
}) => {
  const [sliders, setSliders] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    id: initialData.id,
    subtitle: initialData.subtitle,
    posterStyle: initialData.posterStyle,
    movieIds: initialData.movieIds || [],
  });
  const [titleSearch, setTitleSearch] = useState("");
  const navigate = useNavigate();
  const formRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleRemoveId = (id) => {
    const updatedMovieIds = formData.movieIds.filter(
      (movieId) => movieId !== id
    );
    setFormData((prev) => ({
      ...prev,
      movieIds: updatedMovieIds,
    }));
  };

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIdSelect = (id) => {
    const selectedMovie = sliders.find((item) => item.id === id);
    if (selectedMovie && !formData.movieIds.includes(id)) {
      const updatedMovieIds = [...formData.movieIds, id];
      setFormData((prev) => ({
        ...prev,
        movieIds: updatedMovieIds,
      }));
      setTitleSearch(""); // Reset the titleSearch state
      dropdownRef.current.classList.add("hidden");
    }
  };

  const handleManualIdInput = (e) => {
    setTitleSearch(e.target.value);
    if (e.target.value) {
      dropdownRef.current.classList.remove("hidden");
    } else {
      dropdownRef.current.classList.add("hidden");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUpdating(true);
    if (!formData.movieIds.length) {
      toast.error("Please select at least one movie.");
      setIsUpdating(false);
      return;
    }
    try {
      const db = getDatabase();
      await set(ref(db, "categories/" + initialData.id), { ...formData });
      const options = { timeZone: "Asia/Dubai" };
      await set(
        ref(db, "lastUpdated/time"),
        new Date().toLocaleString("en-US", options)
      );
      toast.success("Movie category updated successfully");
      onEditSuccess(); // Notify parent component of success
      navigate("/Movies/movie-categories");
      setIsUpdating(false);
      setTitleSearch("");
      formRef.current.reset();
      setFormData({ id: "", subtitle: "", posterStyle: "", movieIds: [] });
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating the movie category.");
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed bg-[#d9d9d96c] dark:bg-[#333438a0] z-30 px-4 w-[100%] left-0 top-0 h-full flex items-center justify-center">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white dark:bg-black rounded-xl"
      >
        <div className="flex items-center justify-between w-[100%] text-white px-4 py-3 bg-[#1D1C1C] rounded-t-xl">
          <h1 className="dark:text-[#FDFDFD] my-4 text-2xl">
            Edit Movie Category
          </h1>
          <TiDelete
            size={35}
            className=" cursor-pointer"
            onClick={() => {
              setShowEditMovieCategories(false);
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-12 border border-[#ffffff1a]  p-3 rounded-lg w-full">
          <div className="flex flex-col gap-2">
            <label className="text-black dark:text-[#FDFDFD] font-semibold">
              Title
            </label>
            <input
              type="text"
              name="id"
              className="text-slate-400 bg-transparent border w-full dark:text-[#FDFDFD] dark:placeholder:text-[#FDFDFD] px-3 rounded-lg p-3"
              required
              placeholder="Drama Movies"
              onChange={handleInputChange}
              value={formData?.id || initialData.id}
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
              value={formData.subtitle}
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
              <optgroup className="bg-white dark:bg-black">
                <option className="text-slate-400" value="">
                  Select Poster Style
                </option>
                <option value="Large">Large</option>
                <option value="Small">Small</option>
              </optgroup>
            </select>
          </div>
          <div className="flex flex-col gap-2 z-[60]">
            <label className="text-black dark:text-[#FDFDFD] font-semibold">
              Movie TMDB ID
            </label>
            <div className="flex input-container items-center gap-2 relative max-w-[220px] border border-[#C8C8C8] px-3 rounded-lg overflow-x-auto h-[47px] bg-transparent overflow-scroll">
              {formData.movieIds.map((id) => (
                <div
                  key={id}
                  className="inline-flex items-center bg-gray-200 h-7 dark:bg-[#555555] px-1 rounded-lg"
                >
                  <span className="text-black dark:text-[#FDFDFD]">{id}</span>
                  <TiDelete
                    size={20}
                    className="cursor-pointer"
                    onClick={() => handleRemoveId(id)}
                  />
                </div>
              ))}
              <input
                type="text"
                name="titleSearch"
                className="text-black dark:text-[#FDFDFD] min-w-[50%] bg-transparent focus:outline-none"
                onFocus={() => dropdownRef.current.classList.remove("hidden")}
                value={titleSearch}
                onChange={handleManualIdInput}
                required={!formData.movieIds.length}
              />
            </div>
            <div
              ref={dropdownRef}
              id="dropdown"
              className="dropdown-content hidden absolute bg-white shadow-lg rounded-lg mt-1 max-h-60 overflow-auto z-50"
            >
              {sliders?.map((item) => (
                <a
                  key={item.id}
                  href="#!"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleIdSelect(item.id);
                  }}
                  className="block px-4 py-2 text-black hover:bg-gray-200 relative"
                >
                  {item.options}
                  {formData.movieIds.includes(item.id) && (
                    <RiCheckLine className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-5 p-4">
          <button
            disabled={!formData.movieIds.length}
            className="dark:border-[#FDFDFD] cursor-pointer bg-black border border-black px-4 py-2 text-white rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovieCategories;
