import { toast } from "react-toastify";
import { axiosInstance } from "../../axios";
import { useState } from "react";

function AppUpdator({ configParams, setConfigParams }) {
  const [isLoading, setisLoading] = useState(false);
  const handleParamChange = (e, paramName) => {
    const value = e.target.value;
    const updatedConfigParams = { ...configParams };

    const defaultValue = JSON.parse(
      updatedConfigParams.parameters.app_updater.defaultValue.value
    );

    if (paramName === "releaseNotes") {
      defaultValue[0][paramName] = value.split(",");
    } else {
      defaultValue[0][paramName] = value;
    }

    // Stringify the updated object
    updatedConfigParams.parameters.app_updater.defaultValue.value =
      JSON.stringify(defaultValue);
    setConfigParams(updatedConfigParams);
  };

  const handleUpdateConfig = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      await axiosInstance.post("/remote-config", configParams);
      setisLoading(false);
      toast.success("App Update settings updated successfully");
      setOpen(true);
    } catch (error) {
      console.error("Error updating Remote Config:", error);
      setisLoading(false);
      toast.error(`${error.message}`);
      setOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center  border border-[#ffffff1a] bg-white  p-3 rounded-lg">
        <p className="loading loading-ring loading-lg"></p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <p className="dark:text-[#FDFDFD] py-3 text-black text-lg font-bold">
        App Updater
      </p>
      {configParams ? (
        <form className="flex flex-col gap-7">
          <div className=" bg-white  dark:bg-[#333438] dark:text-[#FDFDFD]  border shadow-lg border-[#ffffff1a]  p-3 rounded-lg">
            <div className="flex flex-col gap-2">
              {JSON.parse(
                configParams.parameters["app_updater"].defaultValue.value
              ).map((paramName) => (
                <div
                  key="app_updater"
                  className="flex text-black flex-col gap-5 text-sm  m-5"
                >
                  <div
                    key="latestVersion"
                    className="flex flex-col text-sm  gap-2 "
                  >
                    <label className="dark:text-[#FDFDFD]">
                      Latest Version
                    </label>
                    <input
                      type="text"
                      value={paramName["latestVersion"]}
                      onChange={(e) => handleParamChange(e, "latestVersion")}
                      className="bg-transparent border dark:text-[#FDFDFD] rounded-lg p-2  "
                    />
                  </div>
                  <div
                    key="latestVersionCode"
                    className="flex flex-col text-sm gap-2 "
                  >
                    <label className="dark:text-[#FDFDFD]">
                      Latest Version Code
                    </label>
                    <input
                      type="text"
                      value={paramName["latestVersionCode"]}
                      onChange={(e) =>
                        handleParamChange(e, "latestVersionCode")
                      }
                      className="bg-transparent border dark:text-[#FDFDFD] rounded-lg p-2 "
                    />
                  </div>
                  <div key="url" className="flex flex-col text-sm gap-2 ">
                    <label className="dark:text-[#FDFDFD]">Url</label>
                    <input
                      type="text"
                      value={paramName["url"]}
                      onChange={(e) => handleParamChange(e, "url")}
                      className="bg-transparent border dark:text-[#FDFDFD] rounded-lg p-2 "
                    />
                  </div>
                  <div
                    key="releaseNotes"
                    className="flex flex-col text-sm  gap-2 "
                  >
                    <label className=" flex flex-col dark:text-[#FDFDFD]">
                      Release Notes:
                    </label>
                    <textarea
                      value={paramName["releaseNotes"].join(",")}
                      className=" bg-transparent border  rounded-lg p-2  min-h-[200px] h-auto dark:text-[#FDFDFD]"
                      onChange={(e) => handleParamChange(e, "releaseNotes")}
                    ></textarea>
                    <span className="text-xs text-red-500">
                      *Note:put comma (,) for a new line.*
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap-reverse gap-4">
            <button
              className="bg-slate-950 dark:text-[#FDFDFD] dark:border-[#FDFDFD] px-4  rounded-2xl text-white font-semibold py-2 sm:text-base text-sm border border-black w-fit self-end"
              onClick={handleUpdateConfig}
            >
              Update App update
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <p className="loading loading-ring loading-lg"></p>
        </div>
      )}
    </div>
  );
}
export default AppUpdator;
