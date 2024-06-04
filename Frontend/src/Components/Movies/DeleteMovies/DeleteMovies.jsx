import { useNavigate } from "react-router-dom";
import {
  getDatabase,
  ref,
  remove,
  update,
  onValue,
  set,
} from "firebase/database";
import { toast } from "react-toastify";

const DeleteMovies = ({ setShowDeletePopup, showToDelete, type }) => {
  const handleDelete = (TMDB, title) => {
    const db = getDatabase();
    remove(ref(db, `${type}/` + TMDB))
      .then(() => {
        if (type !== "shows") {
          let movies = [];
          let newSliders = [];

          const moviesData = ref(db, "movies/");
          onValue(
            moviesData,
            (snapshot) => {
              if (snapshot.val()) {
                movies = Object.keys(snapshot.val()).map((e) => parseInt(e));
              } else {
                const updates = {};
                updates["slider/tmdbIds"] = [];
                update(ref(db), updates);
              }
            },
            {
              onlyOnce: true,
            }
          );

          const sliderdata = ref(db, "slider/tmdbIds");
          onValue(
            sliderdata,
            (snapshot) => {
              if (snapshot.val()) {
                newSliders = snapshot.val().filter((e) => movies.includes(e));
              }
            },
            {
              onlyOnce: true,
            }
          );

          const updates = {};
          updates["slider/tmdbIds"] = newSliders;
          update(ref(db), updates);
        }

        // Update Firebase database with the current time after deletion
        const options = { timeZone: "Asia/Dubai" };
        set(
          ref(db, "lastUpdated/time"),
          new Date().toLocaleString("en-US", options)
        );
        toast.success(
          `${
            type === "shows" ? "TV Show" : "Movie"
          } (${title}) with TMDB ID (${TMDB}) Deleted Successfully`
        );
        // Close the modal after deletion
        setShowDeletePopup(false);
      })
      .catch((error) => {
        // The write failed...
        toast.error(`${error.message}`);
      });
  };
  return (
    <div className="fixed bg-[#d9d9d91d] dark:bg-[#33343837] z-30 px-4 w-[100%] left-0 top-0 h-full flex items-center justify-center">
      <div className="bg-white dark:bg-[#333438] rounded-xl p-4">
        <h3 className="ml-0 text-left text-[#ED1111] font-semibold text-xl">
          Delete Movie
        </h3>
        <p className="py-4 text-[#000000] dark:text-[#FDFDFD] text-[15px] font-normal mb-4">
          Please confirm deleting {showToDelete?.title} with TMDB ID{" "}
          {showToDelete?.TMDB}
        </p>
        <div className="flex gap-2 items-center justify-end">
          <button
            className="px-8 py-2 text-[#1D1C1C] dark:text-[#FDFDFD] dark:border-[#FDFDFD] text-sm font-medium rounded-xl border border-[#1D1C1C]"
            onClick={() => setShowDeletePopup(false)}
          >
            Close
          </button>
          <button
            className="px-8 py-2 text-[#1D1C1C]  dark:text-[#FDFDFD] dark:border-[#FDFDFD]  text-sm font-medium rounded-xl border border-[#1D1C1C]"
            onClick={() =>
              handleDelete(showToDelete?.TMDB, showToDelete?.title)
            }
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMovies;
