const TitleInputs = () => {
  return (
    <div className="flex gap-4">
      <label className="flex flex-col font-bold text-lg text-[#363848] grow gap-2">
        TMDB ID
        <input
          type="text"
          name="TMDB ID"
          className="border-[1px] border-[#C8C8C8] bg-transparent rounded-lg px-3 py-2 text-[#858585] text-base font-normal w-full outline-none placeholder:text-base"
          placeholder="Enter"
          id="tmdb"
          required
        />
      </label>

      <label className="flex flex-col font-bold text-lg text-[#363848] grow gap-2">
        Title
        <input
          type="text"
          name="title"
          className="border-[1px] border-[#C8C8C8] bg-transparent rounded-lg px-3 py-2 text-[#858585] text-base placeholder:text-base font-normal w-full outline-none"
          placeholder="Game oF Thrones "
          id="title"
          required
        />
      </label>
    </div>
  );
};
export default TitleInputs;
