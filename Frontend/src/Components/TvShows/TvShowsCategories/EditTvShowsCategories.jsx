import { useCallback, useEffect, useRef, useState } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TiDelete } from "react-icons/ti";
import { RiCheckLine } from "react-icons/ri"; // Import the check mark icon

const EditTvShowsCategories = ({
  setShowEditTvShowCategories,
  initialData,
  onUpdate,
}) => {
  const [sliders, setSliders] = useState(null);
  const [formData, setFormData] = useState({
    id: initialData.id,
    subtitle: initialData.subtitle,
    posterStyle: initialData.posterStyle,
    showIds: initialData.showIds || [],
  });
  const [titleSearch, setTitleSearch] = useState("");
  const formRef = useRef(null);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".input-container")
      ) {
        dropdownRef.current.classList.add("hidden");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const { id, subtitle, posterStyle, showIds } = initialData;
    setFormData({
      id: id || "",
      subtitle: subtitle || "",
      posterStyle: posterStyle || "",
      showIds: showIds || [],
    });
    setTitleSearch(""); // Reset titleSearch when component re-renders
  }, [initialData]);

  const fetchData = useCallback(() => {
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

  const handleIdSelect = (id) => {
    const selectedMovie = sliders.find((item) => item.id === id);
    if (selectedMovie && !formData.showIds.includes(id)) {
      const updatedShowIds = [...formData.showIds, id];
      setFormData((prev) => ({
        ...prev,
        showIds: updatedShowIds,
      }));
      setTitleSearch(""); // Clear the search field after selection
      dropdownRef.current.classList.add("hidden");
    }
  };

  const handleManualIdInput = (e) => {
    setTitleSearch(e.target.value);
    dropdownRef.current.classList.remove("hidden");
  };

  const handleRemoveId = (id) => {
    const updatedShowIds = formData.showIds.filter((showId) => showId !== id);
    setFormData((prev) => ({
      ...prev,
      showIds: updatedShowIds,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.showIds.length) return;
    try {
      const db = getDatabase();
      set(ref(db, "tvcategories/" + initialData.id), { ...formData });
      const options = { timeZone: "Asia/Dubai" };
      set(
        ref(db, "lastUpdated/time"),
        new Date().toLocaleString("en-US", options)
      );
      toast.success("Tv shows category updated successfully");
      onUpdate(); // Call the onUpdate prop to refresh the data in the parent component
      setShowEditTvShowCategories(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed bg-[#d9d9d91f] dark:bg-[#3334383e] z-30 px-4 w-[100%] left-0 top-0 h-full flex items-center justify-center">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white dark:bg-black rounded-xl"
      >
        <div className="flex items-center justify-between w-[100%] text-white px-4 py-3 bg-[#1D1C1C] rounded-t-xl">
          <h1 className="dark:text-[#FDFDFD] my-4 text-2xl">
            Edit show Category
          </h1>
          <TiDelete
            size={35}
            className="cursor-pointer"
            onClick={() => setShowEditTvShowCategories(false)}
          />
        </div>
        <div className="grid grid-cols-2 md:gap-10 gap-4  p-3  w-full">
          <div className="flex flex-col gap-2">
            <label className="text-black dark:text-[#FDFDFD] font-semibold">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="text-slate-400 bg-transparent border w-full dark:text-[#FDFDFD] dark:placeholder-text-[#FDFDFD] px-3 rounded-lg p-3"
              required
              placeholder="Tv shows"
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
              className="text-slate-400 bg-transparent border w-full dark:text-[#FDFDFD] dark:placeholder-text-[#FDFDFD] px-3 rounded-lg p-3"
              placeholder="Tv show subtitle"
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
              name="posterStyle"
              className="text-slate-400 bg-transparent border w-full dark:text-[#FDFDFD] dark:placeholder:text-[#FDFDFD] dark:placeholder:bg-black px-3 rounded-lg p-3"
              required
              onChange={handleInputChange}
              defaultValue={formData.posterStyle || initialData.posterStyle}
            >
              <optgroup className="bg-white dark:bg-black">
                <option className="text-slate-400 " value="">
                  Select Poster Style
                </option>
                <option value="Large">Large</option>
                <option value="Small">Small</option>
              </optgroup>
            </select>
          </div>
          <div className="flex flex-col gap-2 z-[60]">
            <label className="text-black font-semibold dark:text-[#FDFDFD]">
              Tv Show TMDB ID
            </label>
            <div className="flex input-container items-center gap-2 relative max-w-[220px] border  border-[#C8C8C8] px-3 rounded-lg   overflow-x-auto h-[47px] bg-transparent overflow-scroll">
              {formData.showIds.map((id) => (
                <div
                  key={id}
                  className="inline-flex items-center bg-gray-200 h-7 dark:bg-[#555555] px-1  rounded-lg"
                >
                  <span className="text-black  dark:text-[#FDFDFD]">{id}</span>
                  <TiDelete
                    size={20}
                    className="cursor-pointer"
                    onClick={() => handleRemoveId(id)}
                  />
                </div>
              ))}
              <input
                type="text"
                className="text-black dark:text-[#FDFDFD] min-w-[50%]   bg-transparent focus:outline-none"
                value={titleSearch}
                onChange={handleManualIdInput}
                onFocus={() => dropdownRef.current.classList.remove("hidden")}
              />
            </div>
            <div
              id="dropdown"
              ref={dropdownRef}
              className="dropdown-content hidden absolute  bg-white dark:bg-[#333438] shadow-lg rounded-lg mt-20 max-h-60 overflow-auto z-[60]"
            >
              {sliders?.map((item) => (
                <a
                  key={item.id}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleIdSelect(item.id);
                  }}
                  className={`block px-4 py-2 text-black dark:text-[#FDFDFD] dark:hover:bg-[#333438] hover:bg-gray-200 ${
                    formData.showIds.includes(item.id)
                      ? "bg-gray-200 dark:bg-[#555555]"
                      : ""
                  }`}
                >
                  {item.options}
                  {formData.showIds.includes(item.id) && (
                    <RiCheckLine className="inline-block ml-2 text-green-500" />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-5 p-4">
          <button className="dark:border-[#FDFDFD] cursor-pointer bg-black border border-black px-4 py-2 text-white rounded-lg">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTvShowsCategories;
