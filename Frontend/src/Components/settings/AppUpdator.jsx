import { toast } from "react-toastify";

import { useState, useEffect, useContext } from "react";
import { DarkModeContext } from './../../context/darkModeContext';
import { axiosInstance } from './../../axios';


function AppUpdator({ configParams, setConfigParams, fetchRemoteConfig }) {
  const { setToastMessage, setOpen } = useContext(DarkModeContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (configParams && configParams.parameterGroups && configParams.parameterGroups["API/App Config"]) {
      setIsLoading(false);
    }
  }, [configParams]);

  const handleParamChange = (e, paramName) => {
    const value = e.target.value;
    const updatedConfigParams = { ...configParams };

    const defaultValue = JSON.parse(
      updatedConfigParams.parameterGroups["API/App Config"].parameters["app_updater"].defaultValue.value
    );

    if (paramName === "releaseNotes") {
      defaultValue[paramName] = value.split(",");
    } else {
      defaultValue[paramName] = value;
    }
// for commit
    updatedConfigParams.parameterGroups["API/App Config"].parameters["app_updater"].defaultValue.value = JSON.stringify(defaultValue);
    setConfigParams(updatedConfigParams);
  };

  const handleUpdateConfig = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axiosInstance.post("/remote-config", configParams);
      fetchRemoteConfig();
      setIsLoading(false);
      toast.success("App Update settings updated successfully");
      setOpen(true);
    } catch (error) {
      console.error("Error updating Remote Config:", error);
      setIsLoading(false);
      setToastMessage(`${error.message}`);
      setOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center dark:bg-[#212631] border border-[#ffffff1a] bg-white dark:text-white p-3 rounded-lg">
        <p className="loading loading-ring loading-lg"></p>
      </div>
    );
  }

  if (!configParams || !configParams.parameterGroups || !configParams.parameterGroups["API/App Config"]) {
    return (
      <div className="text-center">
        <p className="loading loading-ring loading-lg"></p>
      </div>
    );
  }

  const appUpdaterParams = JSON.parse(configParams.parameterGroups["API/App Config"].parameters["app_updater"].defaultValue.value);

  return (
    <div className="min-h-screen">
      <p className="dark:text-[#FDFDFD] py-3 text-black text-lg font-bold">App Updater</p>
      <form className="flex flex-col gap-7">
        <div className="bg-white dark:bg-[#333438] dark:text-[#FDFDFD] border shadow-lg border-[#ffffff1a] p-3 rounded-lg">
          <div className="flex flex-col gap-2">
            {Object.entries(appUpdaterParams).map(([key, value]) => {
              if (key === "releaseNotes") {
                return (
                  <div key={key} className="flex items-center text-sm gap-14 lg:gap-40 my-2">
                    <label className="w-1/4 flex flex-col">
                      Release Notes:
                      <span className="text-xs text-red-500">*Note: put comma (,) for a new line.*</span>
                    </label>
                    <textarea
                      value={value.join(",")}
                      className="bg-[#ebedef] rounded-lg p-2 dark:bg-[#323a49] min-h-[300px] h-auto w-1/2"
                      onChange={(e) => handleParamChange(e, key)}
                    ></textarea>
                  </div>
                );
              }

              return (
                <div key={key} className="flex items-center text-sm gap-14 lg:gap-40 my-2">
                  <label className="w-1/4">{key}</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleParamChange(e, key)}
                    className="bg-[#ebedef] rounded-lg p-2 w-1/2 dark:bg-[#323a49]"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-wrap-reverse gap-4">
          <button
            className="bg-slate-950 dark:text-[#FDFDFD] dark:border-[#FDFDFD] px-4 rounded-2xl text-white font-semibold py-2 sm:text-base text-sm border border-black w-fit self-end"
            onClick={handleUpdateConfig}
          >
            Update App 
          </button>
        </div>
      </form>
    </div>
  );
}

export default AppUpdator;
