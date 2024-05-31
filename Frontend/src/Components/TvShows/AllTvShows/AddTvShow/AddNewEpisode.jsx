import { AiFillPlusCircle } from "react-icons/ai";

const AddNewEpisode = () => {
  return (
    <div className="border-[1px] border-[#C8C8C8] rounded-2xl">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
        <input
          type="text"
          className="border-[1px] border-[#C8C8C8] rounded-lg px-3 py-2 text-[#1D1C1C] text-base font-normal grow outline-none placeholder:text-base"
          placeholder="Host 1"
          required
        />
        <input
          type="text"
          className="border-[1px] border-[#C8C8C8] rounded-lg px-3 py-2 text-[#1D1C1C] text-base font-normal grow outline-none placeholder:text-base"
          placeholder="200 MB"
          required
        />
        <input
          type="text"
          className="border-[1px] border-[#C8C8C8] rounded-lg px-3 py-2 text-[#1D1C1C] text-base font-normal grow outline-none placeholder:text-base col-span-2 md:col-span-1"
          placeholder="HD"
          required
        />
        <input
          type="text"
          className="border-[1px] border-[#C8C8C8] rounded-lg px-3 py-2 text-[#1D1C1C] text-base font-normal grow outline-none placeholder:text-base col-span-3"
          placeholder="www.themoviedb.org/tv/2316-the-office"
          required
        />
      </div>
      <button className="border-[1.5px] border-[#1D1C1C] text-black rounded-xl font-semibold text-base m-4 px-3 py-2 flex gap-1 items-center">
        <AiFillPlusCircle size={22} /> Add New Link
      </button>
    </div>
  );
};
export default AddNewEpisode;
