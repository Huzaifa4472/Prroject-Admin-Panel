import { AiFillPlusCircle } from 'react-icons/ai';
import AddNewMovie from './AddNewMovie';

const AddMovieDetails = ({ show }) => {
  return (
    <>
      {show.links?.map((link, linkId) => {
        if (!link.id) return null;
        return (
          <div key={link.id} className="my-8">
            <h1 className="text-black dark:text-[#FDFDFD] font-semibold text-2xl">
              Season 1 Details:
            </h1>
            <div className="flex gap-2 justify-between items-center my-4">
              <h2 className="text-black dark:text-[#FDFDFD] font-semibold text-xl">
                Episode 1
              </h2>
            </div>
            <h1 className="text-lg font-medium">Link {linkId + 1}</h1>
            <AddNewMovie />
            <button className="border-[1.5px] border-[#1D1C1C] text-black dark:text-[#FDFDFD] rounded-xl font-medium text-sm my-8 px-3 py-2 flex gap-1 items-center">
              <AiFillPlusCircle size={22} /> Add New Link
            </button>
            <div className="flex gap-2 flex-col md:flex-row">
              <button className="border-[1.5px] border-[#1D1C1C] text-white bg-[#1D1C1C] dark:text-[#FDFDFD] rounded-xl font-medium text-sm px-12 py-2 flex gap-1 items-center">
                Submit
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AddMovieDetails;
