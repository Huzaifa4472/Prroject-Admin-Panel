import { useState } from "react";
import { axiosInstance } from "../../axios";
import { toast } from "react-toastify";

function PlayStoreAppsChecker({
  configParams,
  setConfigParams,
  fetchRemoteConfig,
}) {
  const [isLoading, setisLoading] = useState(false);
  const [Open, setOpen] = useState(true);
  const handleParamChange = (e, paramName) => {
    const value =
      e.target.type === "checkbox"
        ? e.target.checked.toString()
        : e.target.value;

    // Copy the entire configParams object
    const updatedConfigParams = { ...configParams };

    // Check if parameterGroups is an object (instead of an array)
    if (
      typeof updatedConfigParams.parameterGroups === "object" &&
      updatedConfigParams.parameterGroups !== null
    ) {
      // Update the specific parameters within the parameterGroups
      updatedConfigParams.parameterGroups = Object.keys(
        updatedConfigParams.parameterGroups
      ).reduce((groups, groupId) => {
        if (groupId === "Play Store Apps Checker") {
          // Update parameters within the Play Store Apps Checker group
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

    // Set the updated configParams object
    setConfigParams(updatedConfigParams);
  };

  const handleUpdateConfig = async (e) => {
    setisLoading(true);

    e.preventDefault();
    try {
      await axiosInstance.post("/remote-config", configParams);
      setisLoading(false);
      fetchRemoteConfig();
      toast.success("Play Store Apps Checker updated successfully");
    } catch (error) {
      console.error("Error updating Remote Config:", error);
      setisLoading(false);
      toast.error(`${error.message}`);
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
      <p className=" dark:text-[#FDFDFD] py-3 font-bold text-black text-lg">
        Play Store Apps Checker
      </p>
      {configParams?.parameterGroups ? (
        <form className="flex flex-col gap-5">
          <div className=" bg-white dark:bg-[#333438] border border-[#ffffff1a] shadow-lg  p-3 rounded-2xl">
            <div className="flex flex-col gap-8 text-black">
              {Object.keys(
                configParams.parameterGroups["Play Store Apps Checker"]
                  .parameters
              ).map((paramName) => (
                <div
                  key={paramName}
                  className="flex items-center gap-14 lg:gap-40 text-sm my-2"
                >
                  {configParams.parameterGroups["Play Store Apps Checker"]
                    .parameters[paramName]?.valueType === "STRING" ? (
                    <div className="flex flex-col gap-4 w-[100%]">
                      <label className="dark:text-[#FDFDFD]">
                        {
                          configParams.parameterGroups[
                            "Play Store Apps Checker"
                          ].parameters[paramName]?.description
                        }
                      </label>
                      <input
                        type="text"
                        value={
                          configParams.parameterGroups[
                            "Play Store Apps Checker"
                          ].parameters[paramName]?.defaultValue.value
                        }
                        onChange={(e) => handleParamChange(e, paramName)}
                        className="bg-transparent border dark:text-[#FDFDFD] rounded-lg p-2"
                      />
                    </div>
                  ) : configParams.parameterGroups["Play Store Apps Checker"]
                      .parameters[paramName]?.valueType === "BOOLEAN" ? (
                    <div className="flex items-center w-[100%] gap-4">
                      <input
                        type="checkbox"
                        className="toggle toggle-md dark:text-[#FDFDFD] checked:bg-white bg-white"
                        onChange={(e) => handleParamChange(e, paramName)}
                        checked={
                          configParams.parameterGroups[
                            "Play Store Apps Checker"
                          ].parameters[paramName]?.defaultValue.value ===
                          "false"
                            ? false
                            : true
                        }
                      />
                      <label className="dark:text-[#FDFDFD]">
                        {
                          configParams.parameterGroups[
                            "Play Store Apps Checker"
                          ].parameters[paramName]?.description
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
          <div className="flex flex-wrap-reverse gap-4">
            <button
              className="bg-slate-950 dark:text-[#FDFDFD] dark:border-[#FDFDFD] px-4  rounded-2xl text-white font-semibold py-2 sm:text-base text-sm border border-black w-fit self-end"
              onClick={handleUpdateConfig}
            >
              Update Play Store Apps Checker
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

export default PlayStoreAppsChecker;
