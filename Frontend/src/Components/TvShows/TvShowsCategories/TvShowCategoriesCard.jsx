import { MdOutlineDeleteOutline } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";
import { useCallback, useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import EditTvShowsCategories from "./EditTvShowsCategories";
import DeleteTvShow from "../AllTvShows/DeleteTvShow/DeleteTvShow";
import GrayCircles from "./GrayCircles";

const type = "tvcategories";

const TvShowCategoriesCard = () => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditTvShowCategories, setShowEditTvShowCategories] =
    useState(false);
  const [sliders, setSliders] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [catToDelete, setCatToDelete] = useState(null);
  const [editCategoryData, setEditCategoryData] = useState(null);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    const db = getDatabase();
    const starCountRef = ref(db, "tvcategories/");
    onValue(
      starCountRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setSliders(data);
        } else {
          setSliders(null);
        }
        setIsLoading(false);
      },
      (error) => {
        console.error(error);
        setIsLoading(false);
      }
    );
  }, []);
  console.log("slider data", sliders);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(() => {
    console.log("sliders:", sliders);
  }, [sliders]);
  const handleDelete = (categoryId) => {
    setSliders((prevSliders) => {
      const updatedSliders = { ...prevSliders };
      delete updatedSliders[categoryId];
      return updatedSliders;
    });
  };

  const handleEdit = (id) => {
    const categoryData = sliders[id];
    setEditCategoryData({ id, ...categoryData });
    setShowEditTvShowCategories(true);
  };

  const handleUpdate = () => {
    fetchData();
  };

  return isLoading ? (
    <div className="col-span-full shadow-2xl bg-[#dce1e7] dark:bg-[#333438] text-center px-5 py-10 rounded-xl">
      <p className="loading loading-ring loading-lg"></p>
    </div>
  ) : sliders ? (
    Object.keys(sliders)?.map((id) => (
      <div
        key={id}
        className="w-full md:w-[220px] shadow-lg rounded-2xl bg-white dark:bg-[#333438]"
      >
        <h1 className="my-3 px-4 text-center font-semibold text-xl text-black dark:text-[#FDFDFD]">
          {id}
        </h1>
        <div className="flex gap-2 p-4 justify-center">
          <button
            onClick={() => handleEdit(id)}
            className="flex gap-1 rounded-xl items-center py-1 px-4 border border-[#0F172A] dark:border-[#FDFDFD]"
          >
            <span className="text-[#1D1C1C] dark:text-[#FDFDFD] text-2xl">
              <LiaEdit />
            </span>
            <p className="text-[#0F172A] dark:text-[#FDFDFD] font-semibold text-sm">
              Edit
            </p>
          </button>
          {showEditTvShowCategories && (
            <EditTvShowsCategories
              setShowEditTvShowCategories={setShowEditTvShowCategories}
              initialData={editCategoryData}
              onUpdate={handleUpdate}
            />
          )}
          <button
            className="flex gap-1 rounded-xl items-center py-1 px-4 border border-[#EC2626] text-[#EC2626] font-semibold text-sm"
            onClick={() => {
              setShowDeletePopup(true);
              setCatToDelete(id);
            }}
          >
            <MdOutlineDeleteOutline className="text-[#EC2626] text-2xl" />
            Delete
          </button>
          {showDeletePopup && catToDelete === id && (
            <DeleteTvShow
              setShowDeletePopup={setShowDeletePopup}
              type={type}
              categoryId={catToDelete}
              onDelete={handleDelete}
            />
          )}
        </div>
        <GrayCircles />
      </div>
    ))
  ) : (
    <div className="col-span-full shadow-2xl bg-[#dce1e7] dark:bg-[#333438] px-5 py-10 rounded-xl">
      <p className="dark:text-[#FDFDFD]">
        No TV Show Categories to Show! Try Adding Some
      </p>
    </div>
  );
};

export default TvShowCategoriesCard;
