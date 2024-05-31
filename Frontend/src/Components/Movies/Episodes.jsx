const Episodes = ({ show }) => {
  return (
    <div>
      {show.links?.map((link, index) => {
        return (
          <div
            key={index}
            className="px-[22px] py-3 my-3 rounded-xl border-[1.5px] border-[#D8DBE4]"
          >
            <div className="flex flex-wrap gap-4 items-center my-[2%]">
              <li className="list-none font-normal text-sm text-[#46494F] dark:text-[#FDFDFD]">
                <span className="font-semibold text-[#000000] dark:text-[#FDFDFD]">
                  Host
                </span>
                : {link.host}
              </li>
              <li className="list-none font-normal text-sm text-[#46494F] dark:text-[#FDFDFD]">
                <span className="font-semibold text-[#000000] dark:text-[#FDFDFD]">
                  Quality
                </span>
                : {link.quality}
              </li>
              <li className="list-none font-normal text-sm text-[#46494F] dark:text-[#FDFDFD]">
                <span className="font-semibold text-[#000000] dark:text-[#FDFDFD]">
                  Size
                </span>
                : {link.size}
              </li>
              <li className="list-none font-normal text-sm text-[#46494F] dark:text-[#FDFDFD]">
                <span className="font-semibold text-[#000000] dark:text-[#FDFDFD]">
                  URL
                </span>
                :
                <a href={link.url} target="_blank">
                  {link.url}
                </a>
              </li>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Episodes;
