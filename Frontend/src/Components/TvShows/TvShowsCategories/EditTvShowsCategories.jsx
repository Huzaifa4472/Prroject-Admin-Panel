import { useCallback, useEffect, useRef, useState } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TiDelete } from 'react-icons/ti';

const EditTvShowsCategories = ({
  setShowEditTvShowCategories,
  initialData,
  onUpdate,
}) => {
  const [sliders, setSliders] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    posterStyle: '',
    showIds: [],
  });
  const [titleSearch, setTitleSearch] = useState('');
  const navigate = useNavigate();
  const formRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setFormData({
      title: initialData.title,
      subtitle: initialData.subtitle,
      posterStyle: initialData.posterStyle,
      showIds: initialData.showIds || [],
    });
  }, [initialData]);

  const fetchData = useCallback(() => {
    try {
      const db = getDatabase();
      const starCountRef = ref(db, 'shows/');
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
    if (selectedMovie) {
      setTitleSearch(selectedMovie.options);
      setFormData((prev) => ({
        ...prev,
        showIds: [...prev.showIds, id],
      }));
      dropdownRef.current.classList.add('hidden');
    }
  };

  const handleManualIdInput = (e) => {
    setTitleSearch(e.target.value);
    dropdownRef.current.classList.remove('hidden');
  };

  const handleBlur = () => {
    const match = titleSearch.match(/\( (\d+) \)$/);
    if (match) {
      handleIdSelect(match[1]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.showIds.length) return;
    try {
      const db = getDatabase();
      set(ref(db, 'tvcategories/' + initialData.id), { ...formData });
      const options = { timeZone: 'Asia/Dubai' };
      set(
        ref(db, 'lastUpdated/time'),
        new Date().toLocaleString('en-US', options)
      );
      toast.success('Tv shows category updated successfully');
      onUpdate(); // Call the onUpdate prop to refresh the data in the parent component
      setShowEditTvShowCategories(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed bg-[#D9D9D9B2] dark:bg-[#33343886] z-30 px-4 w-[100%] left-0 top-0 h-full flex items-center justify-center">
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
            className="cursor-pointer"
            onClick={() => setShowEditTvShowCategories(false)}
          />
        </div>
        <div className="grid grid-cols-2 gap-12 border border-[#ffffff1a] p-3 rounded-lg w-full">
          <div className="flex flex-col gap-2">
            <label className="text-black dark:text-[#FDFDFD] font-semibold">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="text-slate-400 bg-transparent border w-full dark:text-[#FDFDFD] dark:placeholder:text-[#FDFDFD] px-3 rounded-lg p-3"
              required
              placeholder="Tv shows"
              onChange={handleInputChange}
              value={formData.title}
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
          <div className="flex flex-col z-[60]">
            <label className="text-black font-semibold dark:text-[#FDFDFD]">
              Tv Show TMDB ID
            </label>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tv Shows Available"
                className="text-black dark:text-[#FDFDFD] dark:bg-[#333438] bg-transparent border border-[#C8C8C8] px-3 rounded-lg w-full py-2"
                onFocus={() => dropdownRef.current.classList.remove('hidden')}
                value={titleSearch}
                onChange={handleManualIdInput}
                onBlur={handleBlur}
                required
              />
              <div
                id="dropdown"
                ref={dropdownRef}
                className="dropdown-content hidden absolute w-full bg-white dark:bg-[#333438] shadow-lg rounded-lg mt-1 max-h-60 overflow-auto z-[60]"
              >
                {sliders?.map((item) => (
                  <a
                    key={item.id}
                    href="#!"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleIdSelect(item.id);
                    }}
                    className="block px-4 py-2 text-black dark:text-[#FDFDFD] dark:hover:bg-[#333438] hover:bg-gray-200"
                  >
                    {item.options}
                  </a>
                ))}
              </div>
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
