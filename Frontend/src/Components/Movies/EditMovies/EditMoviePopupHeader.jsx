import { TiDelete } from 'react-icons/ti';

const EditMoviePopupHeader = ({ setShowEditPopup }) => {
  return (
    <div className="flex items-center justify-between w-[100%] text-white px-4 py-3 bg-[#1D1C1C] rounded-t-xl">
      <h1 className=" text-2xl  font-semibold">Edit Movie</h1>
      <TiDelete
        size={35}
        className=" cursor-pointer"
        onClick={() => {
          setShowEditPopup(false);
        }}
      />
    </div>
  );
};
export default EditMoviePopupHeader;
