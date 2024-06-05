import { getDatabase, ref, remove, set } from "firebase/database";
import React from "react";
const CatDeleteModal = ({ catToDelete, type }) => {
  const handleDelete = (catToDelete) => {
    const db = getDatabase();
    remove(ref(db, `${type}/` + catToDelete))
      .then(() => {
        // Data Deleted successfully!
        const options = { timeZone: "Asia/Dubai" };
        set(
          ref(db, "lastUpdated/time"),
          new Date().toLocaleString("en-US", options)
        );
      })
      .catch((error) => {});
  };
  return catToDelete ? (
    <div className="fixed bg-[#d9d9d96c] dark:bg-[#333438a0] z-30 px-4 w-[100%] left-0 top-0 h-full flex items-center justify-center">
      <div className="modal-box bg-white dark:bg-[#1D1E22]">
        <h3 className="ml-0 text-left text-[#ED1111] font-semibold text-xl">
          Delete {type === "shows" ? "TV Show" : "Movie"}
        </h3>
        <p className="py-4 text-black dark:text-white">
          please confirm deleting
          <span className="font-bold"> {catToDelete} </span> Category!
        </p>
        <div className="modal-action">
          <form className="flex gap-2 items-center">
            <button className="py-2 px-5 rounded-xl text-black dark:text-white bg-transparent duration-150 ease-in-out border dark:border-white border-[#1D1E22]">
              Close
            </button>
            <button
              className=" py-2 px-5 rounded-xl text-normal text-black dark:text-white bg-transparent duration-150 ease-in-out border dark:border-white border-[#1D1E22]"
              onClick={() => handleDelete(catToDelete)}
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default CatDeleteModal;
