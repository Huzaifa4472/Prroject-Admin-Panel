import { AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";

const EditNewEpisode = ({
  episode,
  episodeId,
  handleInputChange,
  i,
  addLink,
  id,
  handleDeleteLink,
}) => {
  const handleCancel = (e) => {
    e.preventDefault();
    if (episode.links.length > 1) {
      handleDeleteLink(i, episodeId, episode.links.length - 1, id);
    }
  };

  return episode?.links?.map((link, linkId) => {
    if (!link.id) return null;
    return (
      <div
        key={link.id}
        className="border-[1px] mb-5 border-[#C8C8C8] dark:border-[#FDFDFD]  bg-transparent rounded-2xl"
      >
        <div className="flex flex-row mt-3 px-4 justify-between">
          <h1 className="text-lg font-medium dark:text-[#FDFDFD] ">
            Link {linkId + 1}
          </h1>
          {episode.links.length > 1 && (
            <button
              onClick={handleCancel}
              type="button"
              className=" font-semibold text-bas px-3 py-2 flex  justify-end"
            >
              <MdOutlineDeleteOutline className="text-[#EC2626] text-2xl" />
            </button>
          )}
        </div>

        <div className="flex flex-col md:grid grid-cols-1 md:grid-cols-3 break-words gap-4 p-4 my-2">
          <input
            defaultValue={link.host}
            onChange={(e) =>
              handleInputChange(e, i, episodeId, linkId, "host", id)
            }
            name={`host_${i}_${episodeId}_${linkId}`}
            type="text"
            className="border-[1px] border-[#C8C8C8] dark:border-[#FDFDFD] dark:bg-[#333438] bg-transparent rounded-lg px-3 w-full py-2 text-black dark:text-white text-base font-normal grow outline-none placeholder:text-base"
            placeholder="Host 1"
            required
          />
          <input
            defaultValue={link.size}
            onChange={(e) =>
              handleInputChange(e, i, episodeId, linkId, "size", id)
            }
            name={`size_${i}_${episodeId}_${linkId}`}
            type="text"
            className="border-[1px] border-[#C8C8C8] dark:border-[#FDFDFD] dark:bg-[#333438] bg-transparent rounded-lg px-3 w-full py-2 text-black dark:text-white text-base font-normal grow outline-none placeholder:text-base"
            placeholder="200 MB"
            required
          />
          <input
            defaultValue={link.quality}
            onChange={(e) =>
              handleInputChange(e, i, episodeId, linkId, "quality", id)
            }
            name={`quality_${i}_${episodeId}_${linkId}`}
            type="text"
            className="border-[1px] border-[#C8C8C8] dark:border-[#FDFDFD] dark:bg-[#333438] bg-transparent rounded-lg px-3 w-full py-2 text-black dark:text-white text-base font-normal grow outline-none placeholder:text-base"
            placeholder="HD"
            required
          />
          <input
            defaultValue={link.url}
            onChange={(e) =>
              handleInputChange(e, i, episodeId, linkId, "url", id)
            }
            type="text"
            className="break-all border-[1px] border-[#C8C8C8] dark:border-[#FDFDFD] dark:bg-[#333438] bg-transparent rounded-lg px-3 w-full py-2 text-black dark:text-white text-base font-normal grow outline-none placeholder:text-base col-span-3"
            placeholder="www.themoviedb.org/tv/2316-the-office"
            required
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            addLink(i, episodeId, id);
          }}
          className="border-[1.5px] border-[#1D1C1C] dark:border-[#FDFDFD] text-black dark:text-[#FDFDFD] rounded-xl font-semibold text-base m-4 px-3 py-2 flex gap-1 items-center"
        >
          <AiFillPlusCircle size={22} /> Add New Link
        </button>
      </div>
    );
  });
};

export default EditNewEpisode;
