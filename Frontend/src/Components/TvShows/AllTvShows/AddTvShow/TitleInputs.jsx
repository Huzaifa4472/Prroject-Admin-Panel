import React from "react";

const TitleInputs = ({ show, handleUniqueInputChange, i, uniqueId }) => {
  const handleChange = (event) => {
    handleUniqueInputChange(i, event); // Passes index and event to parent handler
  };

  return (
    <div className="flex gap-4">
      <label className="flex flex-col font-bold text-lg text-[#363848] grow gap-2">
        TMDB ID
        <input
          type="text"
          name="TMDB ID"
          className="border-[1px] border-[#C8C8C8] bg-transparent rounded-lg px-3 py-2 text-black dark:text-white text-base font-normal w-full outline-none placeholder:text-base"
          placeholder="Enter"
          value={show["TMDB ID"]}
          onChange={handleChange}
          id={`tmdb-${uniqueId}`} // Use a unique ID for TMDB ID input
          required
        />
      </label>
      <label className="flex flex-col font-bold text-lg text-[#363848] grow gap-2">
        Title
        <input
          type="text"
          name="title"
          className="border-[1px] border-[#C8C8C8] bg-transparent rounded-lg px-3 py-2 text-black dark:text-white text-base placeholder:text-base font-normal w-full outline-none"
          placeholder="Game of Thrones"
          value={show.title}
          onChange={(e) => handleUniqueInputChange(i, e)}
          id={`title-${uniqueId}`} // Use a unique ID for title input
          required
        />
      </label>
    </div>
  );
};

export default TitleInputs;
