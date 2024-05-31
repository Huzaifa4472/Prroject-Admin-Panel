const MovieTitleInputs = ({ show, i, handleUniqueInputChange }) => {
  return (
    <div className="flex gap-4">
      <label className="flex flex-col font-bold text-lg text-[#363848] dark:text-[#FDFDFD] grow gap-2">
        TMDB ID
        <input
          type="text"
          name="TMDB ID"
          className="border-[1px] border-[#C8C8C8] rounded-lg px-3 py-2 text-[#858585] dark:text-[#FDFDFD] dark:bg-[#333438] bg-transparent text-base font-normal w-full outline-none placeholder:text-base"
          placeholder="Enter"
          required
          defaultValue={show['TMDB ID']}
          onChange={(e) => handleUniqueInputChange(i, e)}
        />
      </label>

      <label className="flex flex-col font-bold text-lg text-[#363848] dark:text-[#FDFDFD] grow gap-2">
        Title
        <input
          type="text"
          name="title"
          className="border-[1px] border-[#C8C8C8] rounded-lg px-3 py-2 text-[#858585] dark:text-[#FDFDFD] dark:bg-[#333438] bg-transparent text-base placeholder:text-base font-normal w-full outline-none"
          placeholder="Enter title"
          required
          defaultValue={show.title}
          onChange={(e) => handleUniqueInputChange(i, e)}
        />
      </label>
    </div>
  );
};
export default MovieTitleInputs;
