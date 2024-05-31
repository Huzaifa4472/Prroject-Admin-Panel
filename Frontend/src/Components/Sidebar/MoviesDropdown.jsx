import { NavLink } from 'react-router-dom';

const MoviesDropdown = () => {
  return (
    <div className="pl-8 my-8 text-[#7B7B7B]">
      <NavLink
        className={`border-l-[1.5px] relative border-[#D8DBE4] flex items-center px-5 pb-6 gap-3  ${
          window.location.pathname.includes('/Movies/All-movies')
            ? 'text-white'
            : ''
        }`}
        to="/Movies/All-movies"
        // onClick={toggleSideNav}
      >
        <div
          className={`absolute border-[3px] border-white size-[14px] rounded-full top-0 -left-[8px] ${
            window.location.pathname.includes('/Movies/All-movies')
              ? 'bg-black'
              : 'bg-[#D8DBE4]'
          }`}
        ></div>
        All Movies
      </NavLink>
      <NavLink
        className={`border-l-[1.5px] relative border-[#D8DBE4] flex items-center px-5 pb-6 gap-3  ${
          window.location.pathname.includes('/Movies/Add-movies')
            ? 'text-white'
            : ''
        }`}
        to="/Movies/Add-movies"
        onClick={() => {
          setShowAddMovie(true);
          toggleSideNav();
        }}
      >
        <div
          className={`absolute border-[3px] border-white size-[14px] rounded-full top-0 -left-[8px] ${
            window.location.pathname.includes('/Movies/Add-movies')
              ? 'bg-black'
              : 'bg-[#D8DBE4]'
          }`}
        ></div>
        Add Movie
      </NavLink>
      <NavLink
        className={`relative flex items-center px-5 pb-6 gap-3  ${
          window.location.pathname.includes('/Movies/movie-categories')
            ? 'text-white'
            : ''
        }`}
        to="/Movies/movie-categories"
        // onClick={toggleSideNav}
      >
        <div
          className={`absolute border-[3px] border-white size-[14px] rounded-full top-0 -left-[8px] ${
            window.location.pathname.includes('/Movies/movie-categories')
              ? 'bg-black'
              : 'bg-[#D8DBE4]'
          }`}
        ></div>
        Movie Categories
      </NavLink>
    </div>
  );
};
export default MoviesDropdown;
