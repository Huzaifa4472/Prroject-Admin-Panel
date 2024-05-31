import { Fragment } from 'react';

const Episode = ({ season }) => {
  return season.episodes.map((episode, episodeIndex) => (
    <div
      key={episodeIndex}
      className="px-[22px] py-3 my-3 rounded-xl border-[1.5px] border-[#D8DBE4]"
    >
      <p className="list-none font-normal text-base text-[#46494F] dark:text-[#FDFDFD]">
        <span className="font-semibold text-[#000000] dark:text-[#FDFDFD]">
          Episode
        </span>
        : {episodeIndex + 1}
      </p>

      <div className="flex gap-4 flex-wrap items-center my-[2%]">
        <li className="list-none font-normal text-sm text-[#46494F] dark:text-[#FDFDFD]">
          <span className="font-semibold text-[#000000] dark:text-[#FDFDFD]">
            Link
          </span>
          : {episode.links.length}
        </li>
        {episode.links.map((link, linkIndex) => (
          <Fragment key={linkIndex}>
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
            <li className="list-none font-normal text-sm text-[#46494F] dark:text-[#FDFDFD] break-all">
              <span className="font-semibold text-[#000000] dark:text-[#FDFDFD]">
                URL
              </span>
              :
              <a href={link.url} target="_blank">
                {link.url}
              </a>
            </li>
          </Fragment>
        ))}
      </div>
    </div>
  ));
};
export default Episode;
