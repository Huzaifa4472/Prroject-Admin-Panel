import { useCallback, useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { Link } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import CatDeleteModal from "./CatDeleteModal";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";
import EditMovieCategories from "./EditMovieCategories";

const MovieCategories = () => {
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [catToDelete, setCatToDelete] = useState(null);
  const [showEditMovieCategories, setShowEditMovieCategories] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState(null);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    const db = getDatabase();
    const categoriesRef = ref(db, "categories/");
    onValue(
      categoriesRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setCategories(data);
        } else {
          setCategories(null);
        }
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching categories: ", error);
        setIsLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = (id) => {
    setCatToDelete(id);
    setTimeout(() => {
      document.getElementById("my_modal_6").showModal();
    }, 200);
  };

  const handleEdit = (id) => {
    const categoryData = categories[id];
    setEditCategoryData({ id, ...categoryData });
    setShowEditMovieCategories(true);
  };

  const handleEditSuccess = () => {
    fetchData(); // Re-fetch data after a successful edit
    setShowEditMovieCategories(false); // Close the edit modal
  };

  return (
    <div className="min-h-screen flex flex-col py-5 lg:mt-0 mt-11">
      {showEditMovieCategories && (
        <EditMovieCategories
          setShowEditMovieCategories={setShowEditMovieCategories}
          initialData={editCategoryData}
          onEditSuccess={handleEditSuccess}
        />
      )}
      <CatDeleteModal catToDelete={catToDelete || ""} type="categories" />
      <div className="mb-12">
        <div className="flex 500px:items-center 300px:items-start 500px:flex-row 300px:flex-col justify-between w-[100%]  ">
          <div className="text-black dark:text-[#FDFDFD] font-semibold my-4 text-3xl">
            Movie Categories
          </div>
          <Link
            to="/Movies/add-movie-category"
            className="bg-slate-950 flex flex-row items-center gap-1 hover:bg-[#2f3036] transition-all duration-150 ease-in-out py-2 rounded-lg px-4 535eb4] text-[#ffffffde] font-bold 500px:text-sm 300px:text-xs"
          >
            <IoIosAddCircle className="w-5 h-5" />
            Add Movie Category
          </Link>
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        {isLoading ? (
          <div className="w-full md:w-[220px] shadow-lg rounded-2xl bg-white dark:bg-[#333438]">
            <p className="loading loading-ring loading-lg"></p>
          </div>
        ) : categories ? (
          Object.keys(categories).map((id) => (
            <div
              key={id}
              className="w-full md:w-[220px] shadow-lg rounded-2xl bg-white dark:bg-[#333438] flex flex-col"
            >
              <h1 className="my-3 px-4 text-center font-semibold text-xl text-black dark:text-[#FDFDFD]">
                {categories[id].subtitle}
              </h1>
              <div className="flex gap-2 p-4 justify-center mb-auto">
                <button
                  onClick={() => handleEdit(id)}
                  className="flex gap-1 rounded-xl items-center py-1 px-4 border border-[#0F172A] dark:border-[#FDFDFD] text-black dark:text-[#FDFDFD]"
                >
                  <LiaEdit className="text-xl dark:text-[#FDFDFD]" />
                  Edit
                </button>
                <button
                  className="flex gap-1 rounded-xl items-center py-1 px-4 border border-[#EC2626] text-[#EC2626] font-semibold "
                  type="button"
                  onClick={() => handleDelete(id)}
                >
                  <MdOutlineDeleteOutline className="text-xl " />
                  Delete
                </button>
              </div>
              <div className="bg-white dark:bg-[#333438] pt-4 overflow-hidden grid grid-cols-3 items-end w-full md:w-[220px] h-10 rounded-b-2x mt-auto mb-0 rounded-2xl">
                <div className="bg-[#D9D9D980] dark:bg-[#0F0F0F] md:w-[77px] h-[110px] md:h-[77px] rounded-full"></div>
                <div className="bg-[#D9D9D980] dark:bg-[#0F0F0F] md:w-[77px] h-[110px] md:h-[77px] rounded-full"></div>
                <div className="bg-[#D9D9D980] dark:bg-[#0F0F0F] md:w-[77px] h-[110px] md:h-[77px] rounded-full"></div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full shadow-2xl bg-[#dce1e7] dark:text-white dark:bg-[#414155] px-5 py-10 rounded-xl">
            <p>No Movies Categories to Show! Try Adding Some</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCategories;
