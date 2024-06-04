import { IoIosAddCircle } from "react-icons/io";
import SliderCard from "./SliderCard";
import { Link } from "react-router-dom";

const Slider = () => {
  return (
    <div className="min-h-screen lg:mt-0 mt-11">
      <div className="flex gap-4 justify-between flex-wrap my-8 items-start ">
        <h1 className=" text-black font-semibold text-2xl dark:text-[#FDFDFD]">
          Movies Slider
        </h1>
        <Link
          to="add-slider"
          className="text-white bg-black px-6 py-2 flex gap-2 items-center rounded-xl font-medium text-base"
        >
          <IoIosAddCircle className="w-5 h-5" />
          Add Slider
        </Link>
      </div>
      <div className="flex gap-8 my-12 flex-wrap">
        <SliderCard />
      </div>
    </div>
  );
};
export default Slider;
