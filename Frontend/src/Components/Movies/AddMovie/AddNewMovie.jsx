import { MdOutlineDeleteOutline } from "react-icons/md";

const AddNewMovie = () => {
  return (
    <div className="border-[1px] border-[#C8C8C8] rounded-2xl">
      <div className="flex  justify-end w-[100%] mt-2">
        <MdOutlineDeleteOutline className="flex w-[10%] text-lg text-red-500 items-center" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3  gap-4 p-4">
        <input
          type="text"
          className="border-[1px] border-[#C8C8C8] rounded-lg px-3 py-2 text-[#1D1C1C] text-base font-normal grow outline-none placeholder:text-base"
          placeholder="Host"
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
          className="border-[1px] border-[#C8C8C8] rounded-lg px-3 py-2 text-[#1D1C1C] text-base font-normal grow outline-none placeholder:text-base"
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
    </div>
  );
};
export default AddNewMovie;
