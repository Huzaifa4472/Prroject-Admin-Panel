import { useContext } from 'react';
import { MdLightMode } from 'react-icons/md';
import { PiMoonStarsFill } from 'react-icons/pi';
import { DarkModeContext } from '../../context/darkModeContext.jsx';

const LightDarkThemeButton = () => {
  const { theme, setTheme } = useContext(DarkModeContext);

  const toggleDarkMode = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="w-full rounded-xl bg-[#F5F6F8] dark:bg-[#333438] text-[#83899F] font-medium text-base px-3 py-2 flex items-center gap-2"
    >
      <div
        className={`grow flex items-center gap-2 px-4 py-2 ${
          theme === 'light'
            ? 'shadow-md bg-white dark:bg-[#0F0F0F] rounded-lg text-black dark:text-[#FDFDFD]'
            : ''
        }`}
      >
        <MdLightMode size={22} />
        Light
      </div>
      <div
        className={`grow flex items-center gap-2 px-4 py-2 ${
          theme === 'dark'
            ? 'shadow-md bg-white dark:bg-[#0F0F0F] rounded-lg text-black dark:text-[#FDFDFD]'
            : ''
        }`}
      >
        <PiMoonStarsFill size={22} />
        Dark
      </div>
    </button>
  );
};

export default LightDarkThemeButton;
