import { useCallback, useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { MdAddCircleOutline, MdOutlineDesktopWindows } from 'react-icons/md';
import { PiFilmReelBold } from 'react-icons/pi';
import DashboardCard from './DashboardCard';

const Dashboard = () => {
  const db = getDatabase();
  const [totalMovies, setTotalMovies] = useState(0);
  const [totalShows, settotalShows] = useState(0);
  const fetchMovies = useCallback(() => {
    const starCountRef = ref(db, 'movies/');

    try {
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const arrayOfObjects = Object.keys(data).map((key) => ({
            'TMDB ID': key,
            ...data[key],
          }));

          setTotalMovies(arrayOfObjects);
        } else {
          // Handle case where no data is available
        }
      });
    } catch (error) {
      // Handle error
    }
  }, [db]);
  const fetchShows = useCallback(() => {
    const starCountRef = ref(db, 'shows/');

    try {
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const arrayOfObjects = Object.keys(data).map((key) => ({
            'TMDB ID': key,
            ...data[key],
          }));

          settotalShows(arrayOfObjects);
        } else {
          // Handle case where no data is available
        }
      });
    } catch (error) {
      // Handle error
    }
  }, [db]);
  useEffect(() => {
    fetchMovies();
    fetchShows();
  }, [fetchMovies, fetchShows]);

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-semibold text-black dark:text-[#FDFDFD] mt-4 mb-12">
        Dashboard
      </h1>

      <div className=" flex flex-col lg:flex-row gap-8 w-full">
        <DashboardCard
          title="Total TV Shows:"
          value={totalShows?.length || 0}
          icon={<MdOutlineDesktopWindows className="text-white" size={90} />}
        />
        <DashboardCard
          title="Total Movies:"
          value={totalMovies?.length || 0}
          icon={<PiFilmReelBold className="text-white" size={90} />}
        />
      </div>
    </div>
  );
};

export default Dashboard;
