import { IoIosAddCircle } from 'react-icons/io';
import TvShowCategoriesCard from './TvShowCategoriesCard';
import { Link } from 'react-router-dom';

const TvShowCategories = () => {
  return (
    <div className="min-h-screen">
      <div className="flex gap-4 md:justify-between flex-col md:flex-row my-8 items-start">
        <h1 className=" text-black dark:text-[#FDFDFD] font-semibold text-2xl ">
          Tv Show Categories
        </h1>
        <Link
          to="/TvShows/TvShows-categories/add-TvShow-category"
          className="text-white bg-black dark:bg-[#333438] px-6 py-2 flex gap-2 items-center rounded-xl font-medium text-base"
        >
          <IoIosAddCircle className="w-5 h-5" />
          Add Tv show Category
        </Link>
      </div>
      <div className="flex gap-8 my-12 flex-wrap">
        <TvShowCategoriesCard />
      </div>
    </div>
  );
};
export default TvShowCategories;
