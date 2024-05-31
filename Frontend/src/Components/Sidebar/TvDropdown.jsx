import { Link } from 'react-router-dom';

const TvDropdown = () => {
  return (
    <div className="pl-8 text-[#7B7B7B] my-4">
      <Link
        className={`border-l-[1.5px] relative border-[#D8DBE4] flex items-center px-5 pb-6 gap-3 ${
          window.location.pathname.includes('/TvShows/All-TvShows')
            ? 'text-white'
            : ''
        }`}
        to="/TvShows/All-TvShows"
        // onClick={toggleSideNav}
      >
        <div
          className={`absolute border-[3px] border-white size-[14px]  rounded-full top-0 -left-[8px] ${
            window.location.pathname.includes('/TvShows/All-TvShows')
              ? 'bg-black'
              : 'bg-[#D8DBE4]'
          }`}
        ></div>
        All TV Shows
      </Link>
      <Link
        className={`border-l-[1.5px] relative border-[#D8DBE4] flex items-center px-5 pb-6 gap-3  ${
          window.location.pathname.includes('/TvShows/Add-TvShow')
            ? 'text-white'
            : ''
        }`}
        to="/TV-shows/Add-TvShow"
      >
        <div
          className={`absolute border-[3px] border-white size-[14px] rounded-full top-0 -left-[8px] ${
            window.location.pathname.includes('/TV-shows')
              ? 'bg-black'
              : 'bg-[#D8DBE4]'
          }`}
        ></div>
        Add TV Show
      </Link>
      <Link
        className={`relative flex items-center px-5 pb-3 gap-3 ${
          window.location.pathname.includes('/TvShows/TvShows-categories')
            ? 'text-white'
            : ''
        }`}
        to="/TvShows/TvShows-categories"
        // onClick={toggleSideNav}
      >
        <div
          className={`absolute border-[3px] border-white size-[14px] rounded-full top-0 -left-[7px] ${
            window.location.pathname.includes('/TvShows/TvShows-categories')
              ? 'bg-black !text-white'
              : 'bg-[#D8DBE4]'
          }`}
        ></div>
        TV Shows Categories
      </Link>
    </div>
  );
};
export default TvDropdown;
