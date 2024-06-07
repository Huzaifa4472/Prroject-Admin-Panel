import { useState, useEffect } from "react";
import { axiosInstance } from "../../axios";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InAppAnnouncement({ configParams, setConfigParams, setOpen }) {
  const { setToastMessage } = useContext(DarkModeContext);
  const [isLoading, setisLoading] = useState(false);

  const handleParamChange = (e, paramName) => {
    const value =
      e.target.type === "checkbox"
        ? e.target.checked.toString()
        : e.target.value;
    const updatedConfigParams = { ...configParams };

    if (
      typeof updatedConfigParams.parameterGroups === "object" &&
      updatedConfigParams.parameterGroups !== null
    ) {
      updatedConfigParams.parameterGroups = Object.keys(
        updatedConfigParams.parameterGroups
      ).reduce((groups, groupId) => {
        if (groupId === "In-App Announcement") {
          groups[groupId] = {
            ...updatedConfigParams.parameterGroups[groupId],
            parameters: {
              ...updatedConfigParams.parameterGroups[groupId].parameters,
              [paramName]: {
                ...updatedConfigParams.parameterGroups[groupId].parameters[
                  paramName
                ],
                defaultValue: { value: value },
              },
            },
          };
        } else {
          groups[groupId] = updatedConfigParams.parameterGroups[groupId];
        }
        return groups;
      }, {});
    }

    setConfigParams(updatedConfigParams);
  };

  const handleUpdateConfig = async (e) => {
    e.preventDefault();
    setisLoading(true);

    console.log(
      "Updating config with payload:",
      JSON.stringify(configParams, null, 2)
    );

    try {
      const response = await axiosInstance.post("/remote-config", configParams);
      console.log("Server response:", response);
      toast.success("In App Announcement updated successfully");
      setOpen(true);
    } catch (error) {
      console.error(
        "Error updating Remote Config:",
        error.response?.data || error.message
      );
      toast.error(`Error: ${error.response?.data || error.message}`);
    } finally {
      setisLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <div className="text-center dark:bg-[#212631] bg-white border border-[#ffffff1a] dark:text-white p-3 rounded-lg">
          <p className="loading loading-ring loading-lg"></p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <p className="text-black dark:text-[#FDFDFD] text-lg py-3 font-bold ">
        In-App Announcement
      </p>
      {configParams?.parameterGroups ? (
        <form className="flex flex-col gap-10">
          <div className="dark:bg-[#333438] bg-white border border-[#ffffff1a] dark:text-[#FDFDFD] p-3 rounded-lg  ">
            <div className="flex flex-col gap-2  ">
              {Object.keys(
                configParams.parameterGroups["In-App Announcement"].parameters
              ).map((paramName) => (
                <div
                  key={paramName}
                  className="flex flex-col gap-14 lg:gap-5 font-normal text-black text-sm my-2"
                >
                  {configParams.parameterGroups["In-App Announcement"]
                    .parameters[paramName]?.valueType === "STRING" ? (
                    <div className="flex flex-col gap-4">
                      <label className="dark:text-[#FDFDFD]">
                        {
                          configParams.parameterGroups["In-App Announcement"]
                            .parameters[paramName]?.description
                        }
                      </label>
                      <input
                        type="text"
                        value={
                          configParams.parameterGroups["In-App Announcement"]
                            .parameters[paramName]?.defaultValue.value
                        }
                        onChange={(e) => handleParamChange(e, paramName)}
                        className="bg-[#ebedef] bg-transparent border text-[#858585] dark:text-[#FDFDFD] w-[90%] rounded-lg p-2 dark:bg-[#333438]"
                      />
                    </div>
                  ) : configParams.parameterGroups["In-App Announcement"]
                      .parameters[paramName]?.valueType === "BOOLEAN" ? (
                    <div className="flex items-center gap-4 font-medium text-black text-sm">
                      <input
                        type="checkbox"
                        className="toggle toggle-md checked:bg-white bg-white border"
                        onChange={(e) => handleParamChange(e, paramName)}
                        checked={
                          configParams.parameterGroups["In-App Announcement"]
                            .parameters[paramName]?.defaultValue.value ===
                          "false"
                            ? false
                            : true
                        }
                      />
                      <label className="w-full dark:text-[#FDFDFD]">
                        {
                          configParams.parameterGroups["In-App Announcement"]
                            .parameters[paramName]?.description
                        }
                      </label>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <button
              className="bg-slate-950 px-4 py-2 rounded-2xl dark:bg-[#333438] dark:text-[#FDFDFD] dark:border-[#FDFDFD] text-white font-bold sm:text-base text-sm border border-black w-fit self-end"
              onClick={handleUpdateConfig}
            >
              Update In-App Announcement
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

export default InAppAnnouncement;
