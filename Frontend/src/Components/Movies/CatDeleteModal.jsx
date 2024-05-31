import { getDatabase, ref, remove, set } from 'firebase/database';
import React from 'react';
const CatDeleteModal = ({ catToDelete, type }) => {
  const handleDelete = (catToDelete) => {
    const db = getDatabase();
    remove(ref(db, `${type}/` + catToDelete))
      .then(() => {
        // Data Deleted successfully!
        const options = { timeZone: 'Asia/Dubai' };
        set(
          ref(db, 'lastUpdated/time'),
          new Date().toLocaleString('en-US', options)
        );
      })
      .catch((error) => {});
  };
  return catToDelete ? (
    <dialog id="my_modal_6" className="modal  modal-middle sm:modal-middle">
      <div className="modal-box ">
        <h3 className="text-md font-bold">
          Delete {type === 'shows' ? 'TV Show' : 'Movie'}
        </h3>
        <p className="py-4">
          please confirm deleting
          <span className="font-bold"> {catToDelete} </span> Category!
        </p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-2 items-center">
            <button className="btn " onClick={() => handleDelete(catToDelete)}>
              Confirm
            </button>
            <button className="btn transition-all duration-150 ease-in-out ">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  ) : (
    ''
  );
};

export default CatDeleteModal;
