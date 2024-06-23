const TitleInputs = ({ show, handleUniqueInputChange, i }) => {
  return (
    <div className="flex gap-4">
      <label className="flex flex-col font-bold text-lg text-[#363848] dark:text-[#FDFDFD] grow gap-2">
        TMDB ID
        <input
          defaultValue={show["TMDB ID"]}
          type="text"
          name="TMDB ID"
          className="border-[1px] border-[#C8C8C8] rounded-lg px-3 py-2 text-black dark:text-white dark:border-[#FDFDFD] bg-transparent dark:bg-[#33343886] text-base font-normal w-full outline-none placeholder:text-base dark:bg-[#333438]"
          placeholder="Enter"
          id="tmdb" // Unique ID for TMDB ID input
          onChange={(e) => handleUniqueInputChange(i, e)}
          required
        />
      </label>

      <label className="flex flex-col font-bold text-lg text-[#363848] dark:text-[#FDFDFD] grow gap-2">
        Title
        <input
          defaultValue={show.title}
          type="text"
          name="title"
          className="border-[1px] border-[#C8C8C8] rounded-lg px-3 py-2 text-black dark:text-white dark:border-[#FDFDFD] bg-transparent dark:bg-[#33343886] text-base placeholder:text-base font-normal w-full outline-none dark:bg-[#333438]"
          placeholder="Game oF Thrones "
          id="title" // Unique ID for title input
          onChange={(e) => handleUniqueInputChange(i, e)}
          required
        />
      </label>
    </div>
  );
};
export default TitleInputs;
