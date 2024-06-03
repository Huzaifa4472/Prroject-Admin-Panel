import { AiFillPlusCircle } from "react-icons/ai";
import AddNewEpisode from "./EditNewEpisode";

const SeasonDetails = ({
  show,
  i,
  addEpisode,
  handleInputChange,
  addLink,
  addSeason,
  handleDeleteLink,
}) => {
  return show?.seasons.map((season, id) => {
    return (
      <div key={season?.id} className="my-8">
        <h1 className="text-black dark:text-[#FDFDFD]  font-semibold text-2xl">
          Season {id + 1} Details:
        </h1>
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
                <button
                  type="button"
                  onClick={() => addEpisode(i, id)}
                  className="border-[1.5px] border-[#1D1C1C] dark:bg-[#333438] dark:border-[#333438] text-black dark:text-[#FDFDFD] rounded-xl font-semibold text-base px-3 py-2 flex gap-1 items-center"
                >
                  <AiFillPlusCircle size={22} /> Add New Episode
                </button>
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

        <button
          type="button"
          onClick={() => addSeason(i)}
          className="border-[1.5px] border-[#1D1C1C] dark:bg-[#333438] dark:border-[#FDFDFD] text-black dark:text-[#FDFDFD] rounded-xl font-medium text-sm my-8 px-3 py-2 flex gap-1 items-center"
        >
          <AiFillPlusCircle size={22} /> Add New Season
        </button>
      </div>
    );
  });
};
export default SeasonDetails;
