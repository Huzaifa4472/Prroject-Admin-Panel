import React from "react";

const MovieTitleInputs = ({ show, handleUniqueInputChange, i }) => {
  return (
    <div className="flex gap-4">
      <label className="flex flex-col font-bold text-lg text-[#363848] grow gap-2">
        TMDB ID
        <input
          value={show["TMDB ID"]}
          onChange={(e) => handleUniqueInputChange(i, e)}
          type="text"
          name="TMDB ID"
          className="border-[1px] border-[#C8C8C8] bg-transparent dark:bg-[#333438] rounded-lg px-3 py-2 text-[#858585] text-base font-normal w-full outline-none placeholder:text-base"
          placeholder="Enter"
          required
        />
      </label>
      <label className="flex flex-col font-bold text-lg text-[#363848] grow gap-2">
        Title
        <input
          value={show.title}
          onChange={(e) => handleUniqueInputChange(i, e)}
          type="text"
          name="title"
          className="border-[1px] border-[#C8C8C8] bg-transparent dark:bg-[#333438] rounded-lg px-3 py-2 text-[#858585] text-base placeholder:text-base font-normal w-full outline-none"
          placeholder="Enter Title"
          required
        />
      </label>
    </div>
  );
};

export default MovieTitleInputs;
