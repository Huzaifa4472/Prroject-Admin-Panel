import { IoIosAddCircle } from "react-icons/io";
import TvShowCategoriesCard from "./TvShowCategoriesCard";
import { Link } from "react-router-dom";

const TvShowCategories = () => {
  return (
    <div className="min-h-screen lg:mt-0 mt-10">
      <div className="flex gap-4 md:justify-between flex-col md:flex-row my-8 items-start">
        <h1 className=" text-black dark:text-[#FDFDFD] font-semibold text-3xl ">
          Tv Show Categories
        </h1>
        <Link
          to="/TvShows/TvShows-categories/add-TvShow-category"
          className="bg-slate-950 flex flex-row items-center gap-1 hover:bg-[#2f3036] transition-all duration-150 ease-in-out py-2 rounded-lg px-4 535eb4] text-[#ffffffde] font-bold 500px:text-sm 300px:text-xs"
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
