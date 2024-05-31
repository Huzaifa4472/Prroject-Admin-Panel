import { useCallback, useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GrayCircles from '../TvShows/TvShowsCategories/GrayCircles';
import DeleteTvShow from '../TvShows/AllTvShows/DeleteTvShow/DeleteTvShow';

const SliderCard = () => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [sliders, setSliders] = useState(null);
  const [noOfItems, setNoOfItems] = useState();

  const fetchData = useCallback(() => {
    const db = getDatabase();
    const starCountRef = ref(db, 'slider/');

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log(data);
        setNoOfItems(data.numberOfItems);
        setSliders(data);
      } else {
        setSliders(null);
      }
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDel = async (TMDB) => {
    try {
      const filteredTmdbIds = sliders?.tmdbIds.filter(
        (id) => id['TMDB ID'] !== TMDB
      );
      console.log(filteredTmdbIds);

      const db = getDatabase();
      await set(ref(db, 'slider/tmdbIds'), filteredTmdbIds);

      if (parseInt(noOfItems) > filteredTmdbIds.length) {
        await set(ref(db, 'slider/numberOfItems'), filteredTmdbIds.length);
      }

      const options = { timeZone: 'Asia/Dubai' };
      await set(
        ref(db, 'lastUpdated/time'),
        new Date().toLocaleString('en-US', options)
      );

      toast.success('Movie deleted successfully!');
    } catch (error) {
      console.log(error.message);
      toast.error('An error occurred while deleting the movie.');
    }
  };

  return (
    <>
      {sliders &&
        sliders.tmdbIds &&
        sliders.tmdbIds.map((id) => (
          <div
            key={id['TMDB ID']}
            className="w-full md:w-[220px] shadow-lg rounded-2xl bg-white dark:bg-[#333438]"
          >
            <div className="flex flex-col items-center font-semibold">
              <h1 className="my-3 px-4 text-center text-xl text-black dark:text-[#FDFDFD]">
                {id.title}
              </h1>
              <p className="lg:text-[17px] md:text-sm dark:text-[#FDFDFD]">
                {id['TMDB ID']}
              </p>
            </div>
            <div className="flex gap-2 p-4 justify-center">
              <button
                type="button"
                className="flex gap-1 rounded-xl items-center py-1 px-4 border border-[#EC2626] text-[#EC2626] font-semibold text-sm"
                onClick={() => handleDel(id['TMDB ID'])}
              >
                <MdOutlineDeleteOutline className="text-[#EC2626] text-2xl" />
                Delete
              </button>
              {showDeletePopup && (
                <DeleteTvShow setShowDeletePopup={setShowDeletePopup} />
              )}
            </div>
            <GrayCircles />
          </div>
        ))}
    </>
  );
};

export default SliderCard;
