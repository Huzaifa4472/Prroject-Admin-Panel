import Episode from './Episode';

const Season = ({ show }) => {
  return show.seasons.map((season, seasonIndex) => (
    <div key={seasonIndex}>
      <div className="flex gap-7 items-center my-[2%]">
        <li className="list-none font-normal text-base text-[#46494F] dark:text-[#FDFDFD]">
          <span className="font-semibold text-[#000000] dark:text-[#FDFDFD]">
            Season
          </span>
          : &#160;
          {seasonIndex + 1}
        </li>
        <li className="list-none font-normal text-base text-[#46494F] dark:text-[#FDFDFD] ">
          <span className="font-semibold text-[#000000] dark:text-[#FDFDFD] ">
            No of Episodes
          </span>
          : &#160;
          {season.episodes.length}
        </li>
      </div>
      <Episode season={season} />
    </div>
  ));
};
export default Season;
