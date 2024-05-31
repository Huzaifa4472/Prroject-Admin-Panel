import { TiDelete } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

const AddPopupHeader = ({ setShowAddTvShowPopup }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between w-[100%] text-white px-4 py-3 bg-[#1D1C1C] rounded-t-xl">
      <h1 className=" text-2xl  font-semibold">Add Tv Show</h1>
      {window.location.pathname.includes('/TV-shows/Add-TvShow') ? (
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="text-black bg-white px-6 py-2 text-base rounded-xl "
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
export default AddPopupHeader;
