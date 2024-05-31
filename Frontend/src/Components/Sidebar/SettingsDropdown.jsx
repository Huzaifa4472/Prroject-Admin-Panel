import { Link } from 'react-router-dom';

const SettingsDropdown = () => {
  return (
    <div className="pl-8 my-4 text-[#7B7B7B]">
      <Link
        className={`border-l-[1.5px] relative border-[#D8DBE4] flex items-center px-5 pb-6 gap-3  ${
          window.location.pathname.includes('/settings/InAppAnnouncement')
            ? 'text-white'
            : ''
        }`}
        to="/settings/InAppAnnouncement"
        // onClick={toggleSideNav}
      >
        <div
          className={`absolute border-[3px] border-white size-[14px] rounded-full top-0 -left-[8px] ${
            window.location.pathname.includes('/settings/InAppAnnouncement')
              ? 'bg-black'
              : 'bg-[#D8DBE4]'
          }`}
        ></div>
        In App Announcement
      </Link>
      <Link
        className={`border-l-[1.5px] relative border-[#D8DBE4] flex items-center px-5 pb-6 gap-3  ${
          window.location.pathname.includes('/settings/appconfig')
            ? 'text-white'
            : ''
        }`}
        to="/settings/appconfig"
        // onClick={toggleSideNav}
      >
        <div
          className={`absolute border-[3px] border-white size-[14px] rounded-full top-0 -left-[8px] ${
            window.location.pathname.includes('/settings/appconfig')
              ? 'bg-black'
              : 'bg-[#D8DBE4]'
          }`}
        ></div>
        App Configuration
      </Link>
      <Link
        className={`border-l-[1.5px] relative border-[#D8DBE4] flex items-center px-5 pb-6 gap-3  ${
          window.location.pathname.includes('/settings/ads') ? 'text-white' : ''
        }`}
        to="/settings/ads"
        // onClick={toggleSideNav}
      >
        <div
          className={`absolute border-[3px] border-white size-[14px] rounded-full top-0 -left-[8px] ${
            window.location.pathname.includes('/settings/ads')
              ? 'bg-black'
              : 'bg-[#D8DBE4]'
          }`}
        ></div>
        Ads Settings
      </Link>
      <Link
        className={`border-l-[1.5px] relative border-[#D8DBE4] flex items-center px-5 pb-6 gap-3  ${
          window.location.pathname.includes('/settings/AppSecurity')
            ? 'text-white'
            : ''
        }`}
        to="/settings/AppSecurity"
        // onClick={toggleSideNav}
      >
        <div
          className={`absolute border-[3px] border-white size-[14px] rounded-full top-0 -left-[8px] ${
            window.location.pathname.includes('/settings/AppSecurity')
              ? 'bg-black'
              : 'bg-[#D8DBE4]'
          }`}
        ></div>
        App Security
      </Link>
      <Link
        className={`border-l-[1.5px] relative border-[#D8DBE4] flex items-center px-5 pb-6 gap-3  ${
          window.location.pathname.includes('/settings/Play_Store_Apps_Checker')
            ? 'text-white'
            : ''
        }`}
        to="/settings/Play_Store_Apps_Checker"
        // onClick={toggleSideNav}
      >
        <div
          className={`absolute border-[3px] border-white size-[14px] rounded-full top-0 -left-[8px] ${
            window.location.pathname.includes(
              '/settings/Play_Store_Apps_Checker'
            )
              ? 'bg-black'
              : 'bg-[#D8DBE4]'
          }`}
        ></div>
        Play Store Apps Checker
      </Link>
      <Link
        className={`border-l-[1.5px] relative border-[#D8DBE4] flex items-center px-5 pb-6 gap-3  ${
          window.location.pathname.includes('/settings/content_blocker')
            ? 'text-white'
            : ''
        }`}
        to="/settings/content_blocker"
        // onClick={toggleSideNav}
      >
        <div
          className={`absolute border-[3px] border-white size-[14px] rounded-full top-0 -left-[8px] ${
            window.location.pathname.includes('/settings/content_blocker')
              ? 'bg-black'
              : 'bg-[#D8DBE4]'
          }`}
        ></div>
        Content Blocker
      </Link>
      <Link
        className={`border-l-[1.5px] relative border-[#D8DBE4] flex items-center px-5 pb-6 gap-3  ${
          window.location.pathname.includes('/settings/Location_Filter')
            ? 'text-white'
            : ''
        }`}
        to="/settings/Location_Filter"
        // onClick={toggleSideNav}
      >
        <div
          className={`absolute border-[3px] border-white size-[14px] rounded-full top-0 -left-[8px] ${
            window.location.pathname.includes('/settings/Location_Filter')
              ? 'bg-black'
              : 'bg-[#D8DBE4]'
          }`}
        ></div>
        Location Filter
      </Link>
      <Link
        className={` relative  flex items-center px-5 pb-3 gap-3  ${
          window.location.pathname.includes('/settings/App_Updater')
            ? 'text-white'
            : ''
        }`}
        to="/settings/App_Updater"
        // onClick={toggleSideNav}
      >
        <div
          className={`absolute border-[3px] border-white size-[14px] rounded-full top-0 -left-[8px] ${
            window.location.pathname.includes('/settings/App_Updater')
              ? 'bg-black'
              : 'bg-[#D8DBE4]'
          }`}
        ></div>
        App Updater
      </Link>
    </div>
  );
};
export default SettingsDropdown;
