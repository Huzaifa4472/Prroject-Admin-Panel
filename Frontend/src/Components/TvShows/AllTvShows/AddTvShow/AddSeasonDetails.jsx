import { AiFillPlusCircle } from "react-icons/ai";
import AddNewEpisode from "./AddNewEpisode";

const AddSeasonDetails = () => {
  return (
    <div className="my-8">
      <h1 className="text-black  font-semibold text-2xl">Season 1 Details:</h1>
      <div className="flex gap-2 justify-between flex-wrap items-center my-4">
        <h2 className="text-black  font-semibold text-xl">Episode 1</h2>
        <button className="border-[1.5px] border-[#1D1C1C] text-black rounded-xl font-semibold text-base px-3 py-2 flex gap-1 items-center">
          <AiFillPlusCircle size={22} /> Add New Episode
        </button>
      </div>

      <AddNewEpisode />

      <button className="border-[1.5px] border-[#1D1C1C] text-black rounded-xl font-medium text-sm my-8 px-3 py-2 flex gap-1 items-center">
        <AiFillPlusCircle size={22} /> Add New Season
      </button>

      <div className="flex gap-2 flex-col md:flex-row">
        <button className="border-[1.5px] border-[#1D1C1C] text-white bg-[#1D1C1C] rounded-xl font-medium text-sm px-12 py-2 flex gap-1 items-center justify-center">
          Submit
        </button>
      </div>
    </div>
  );
};
export default AddSeasonDetails;
