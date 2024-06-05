import { AiFillPlusCircle } from "react-icons/ai";
import AddNewEpisode from "./EditNewEpisode";
import { MdOutlineDeleteOutline } from "react-icons/md";

const SeasonDetails = ({
  show,
  i,
  addEpisode,
  handleInputChange,
  addLink,
  addSeason,
  handleDeleteLink,
  deleteEpisode,
  deleteSeason,
}) => {
  return show?.seasons.map((season, id) => {
    return (
      <div key={season?.id} className="my-8">
        <div className="flex items-center justify-between">
          <h1 className="text-black dark:text-[#FDFDFD]  font-semibold text-2xl">
            Season {id + 1} Details:
          </h1>
          <button
            type="button"
            onClick={() => deleteSeason(i, id)} // Call deleteSeason function with i and id
            className="text-red-500"
          >
            <MdOutlineDeleteOutline size={22} />
          </button>
        </div>
        {season?.episodes?.map((episode, episodeId) => {
          if (!episode || !episode.id || !episode.links) return null; // Check for null or undefined episode or links
          return (
            <>
              <div
                key={episode?.id}
                className="flex flex-wrap gap-2 justify-between items-center my-4"
              >
                <h2 className="text-black dark:text-[#FDFDFD] font-semibold text-xl">
                  Episode {episodeId + 1}
                </h2>
                <div className="flex gap-5">
                  <button
                    type="button"
                    onClick={() => deleteEpisode(i, id, episodeId)} // Call deleteEpisode function with i, id, and episodeId
                    className="text-red-500"
                  >
                    <MdOutlineDeleteOutline size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={() => addEpisode(i, id)}
                    className="border-[1.5px] border-[#1D1C1C] dark:bg-[#333438] dark:border-[#333438] text-black dark:text-[#FDFDFD] rounded-xl font-semibold text-base px-3 py-2 flex gap-1 items-center"
                  >
                    <AiFillPlusCircle size={22} /> Add New Episode
                  </button>
                </div>
              </div>
              <AddNewEpisode
                episode={episode}
                episodeId={episodeId}
                handleInputChange={handleInputChange}
                i={i}
                addLink={addLink}
                id={id}
                handleDeleteLink={handleDeleteLink}
              />
            </>
          );
        })}
        <div>
          <button
            type="button"
            onClick={() => addSeason(i)}
            className="border-[1.5px] border-[#1D1C1C] dark:bg-[#333438] dark:border-[#FDFDFD] text-black dark:text-[#FDFDFD] rounded-xl font-medium text-sm my-8 px-3 py-2 flex gap-1 items-center"
          >
            <AiFillPlusCircle size={22} /> Add New Season
          </button>
        </div>
      </div>
    );
  });
};
export default SeasonDetails;
