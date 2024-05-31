const MovieEpisode = ({ link, host, quality, size, url }) => {
  return (
    <div className=" px-[22px] py-3 my-3 rounded-xl border-[1.5px] border-[#D8DBE4]">
      {/* <p className="list-none font-normal text-base text-[#46494F] dark:text-[#FDFDFD]">
        <span className="font-semibold text-[#000000] dark:text-[#FDFDFD]">Link</span>: {episode}
      </p> */}

      <div className="flex flex-wrap gap-4 items-center my-[2%]">
        <li className="list-none font-normal text-sm text-[#46494F] dark:text-[#FDFDFD]">
          <span className="font-semibold text-[#000000] dark:text-[#FDFDFD]">
            Host
          </span>
          : {host}
        </li>
        <li className="list-none font-normal text-sm text-[#46494F] dark:text-[#FDFDFD]">
          <span className="font-semibold text-[#000000] dark:text-[#FDFDFD]">
            Quality
          </span>
          : {quality}
        </li>
        <li className="list-none font-normal text-sm text-[#46494F] dark:text-[#FDFDFD]">
          <span className="font-semibold text-[#000000] dark:text-[#FDFDFD]">
            Size
          </span>
          : {size}
        </li>
        <li className="list-none font-normal text-sm text-[#46494F] dark:text-[#FDFDFD]">
          <span className="font-semibold text-[#000000] dark:text-[#FDFDFD]">
            URL
          </span>
          :
          <a href={url} target="_blank">
            {url}
          </a>
        </li>
      </div>
    </div>
  );
};
export default MovieEpisode;
