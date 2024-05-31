import { TiDelete } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

const AddMoviiePopupHeader = ({ setShowAddTvShowPopup }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between w-[100%] text-white px-4 py-3 bg-[#1D1C1C] rounded-t-xl">
      <h1 className=" text-2xl dark:text-[#FDFDFD]  font-semibold">
        Add Movie
      </h1>
      {window.location.pathname.includes('/Movies/Add-movies') ? (
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="text-black dark:text-[#FDFDFD] dark:bg-[#333438] bg-white px-6 py-2 text-base rounded-xl "
        >
          back
        </button>
      ) : (
        <TiDelete
          size={35}
          className=" cursor-pointer"
          onClick={() => {
            setShowAddTvShowPopup(false);
          }}
        />
      )}
    </div>
  );
};
export default AddMoviiePopupHeader;
