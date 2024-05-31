import { useContext } from "react";
import { DarkModeContext } from "../../../../context/darkModeContext";
import { getDatabase, ref, remove, set } from "firebase/database";
import { toast } from "react-toastify";

const DeleteTvShow = ({ setShowDeletePopup, type, categoryId, onDelete }) => {
  const { setOpen } = useContext(DarkModeContext);

  const handleDelete = () => {
    const db = getDatabase();
    const categoryRef = ref(db, `${type}/${categoryId}`);

    remove(categoryRef)
      .then(() => {
        const options = { timeZone: "Asia/Dubai" };
        const timeRef = ref(db, "lastUpdated/time");
        set(timeRef, new Date().toLocaleString("en-US", options))
          .then(() => {
            setOpen(true);
            onDelete(categoryId);
            setShowDeletePopup(false);
          })
          .catch((error) => {
            setOpen(true);
            toast.error(`Error deleting: ${error.message}`);
          });
        toast.success(`TV Show (${categoryId}) Deleted Successfully`);
      })
      .catch((error) => {
        console.error("Error deleting TV show:", error);
        setOpen(true);
        toast.error(`Error: ${error.message}`);
      });
  };

  return (
    <div className="fixed bg-[#D9D9D9B2] dark:bg-[#33343886] z-30 px-4 w-[100%] left-0 top-0 h-full flex items-center justify-center">
      <div className="bg-white dark:bg-[#333438] rounded-xl p-4">
        <h3 className="ml-0 text-left text-[#ED1111] font-semibold text-xl">
          Delete TV Show
        </h3>
        <p className="py-4 text-[#000000] dark:text-[#FDFDFD] text-[15px] font-normal mb-4">
          Please confirm deleting TV Show with ID: {categoryId}
        </p>

        <div className="flex gap-2 items-center justify-end">
          <button
            className="px-8 py-2 text-[#1D1C1C] dark:text-[#FDFDFD] dark:border-[#FDFDFD] text-sm font-medium rounded-xl border border-[#1D1C1C]"
            onClick={() => {
              setShowDeletePopup(false);
            }}
          >
            Close
          </button>
          <button
            onClick={handleDelete}
            className="px-8 py-2 text-[#1D1C1C]  dark:text-[#FDFDFD] dark:border-[#FDFDFD]  text-sm font-medium rounded-xl border border-[#1D1C1C]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTvShow;
