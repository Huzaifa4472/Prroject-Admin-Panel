import { useCallback, useEffect, useRef, useState } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TiDelete } from 'react-icons/ti';

const EditMovieCategories = ({
  setShowEditMovieCategories,
  initialData,
  onEditSuccess,
}) => {
  const [sliders, setSliders] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData.title,
    subtitle: initialData.subtitle,
    posterStyle: initialData.posterStyle,
    movieIds: initialData.movieIds || [],
  });
  const [titleSearch, setTitleSearch] = useState('');
  const navigate = useNavigate();
  const formRef = useRef(null);

  const fetchData = useCallback(() => {
    try {
      const db = getDatabase();
      const starCountRef = ref(db, 'movies/');
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
      setFormData((prev) => ({ ...prev, movieIds: [id] }));
      document.getElementById('dropdown').classList.add('hidden');
    }
  };

  const handleManualIdInput = (e) => {
    setTitleSearch(e.target.value);
  };

  const handleBlur = () => {
    const match = titleSearch.match(/\( (\d+) \)$/);
    if (match) {
      handleIdSelect(match[1]);
    } else {
      setFormData((prev) => ({
        ...prev,
        movieIds: [...(prev.movieIds || []), titleSearch],
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsUpdating(true);
    if (!formData.movieIds.length) return;
    const { title, ...rest } = formData;
    try {
      const db = getDatabase();
      set(ref(db, 'categories/' + initialData.id), { ...rest, title });
      const options = { timeZone: 'Asia/Dubai' };
      set(
        ref(db, 'lastUpdated/time'),
        new Date().toLocaleString('en-US', options)
      );
      toast.success('Movie category updated successfully');
      onEditSuccess(); // Notify parent component of success
      navigate('/Movies/movie-categories');
      setIsUpdating(false);
      setTitleSearch('');
      formRef.current.reset();
      setFormData({ title: '', subtitle: '', posterStyle: '', movieIds: [] });
    } catch (error) {
      console.log(error);
      setIsUpdating(false);
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
              name="title"
              className="text-slate-400 bg-transparent border w-full dark:text-[#FDFDFD] dark:placeholder:text-[#FDFDFD] px-3 rounded-lg p-3"
              required
              placeholder="Drama Movies"
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
                  document.getElementById('dropdown').classList.remove('hidden')
                }
                value={titleSearch}
                onChange={handleManualIdInput}
                onBlur={handleBlur}
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
                    onClick={() => handleIdSelect(item.id)}
                    className="block px-4 py-2 text-black hover:bg-gray-200"
                  >
                    {item.options}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-5 p-4">
          <button
            disabled={!formData.movieIds.length}
            className="dark:border-[#FDFDFD] cursor-pointer bg-black border border-black px-4 py-2 text-white rounded-lg"
          >
            Edit Movie Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovieCategories;
