import { useState } from 'react';
import { axiosInstance } from '../../axios';
import { toast } from 'react-toastify';

function ContentBlocker({ configParams, setConfigParams }) {
  const [isLoading, setisLoading] = useState(false);
  const handleParamChange = (e, paramName) => {
    const value =
      e.target.type === 'checkbox'
        ? e.target.checked.toString()
        : e.target.value;

    // Copy the entire configParams object
    const updatedConfigParams = { ...configParams };

    // Check if parameterGroups is an object (instead of an array)
    if (
      typeof updatedConfigParams.parameterGroups === 'object' &&
      updatedConfigParams.parameterGroups !== null
    ) {
      // Update the specific parameters within the parameterGroups
      updatedConfigParams.parameterGroups = Object.keys(
        updatedConfigParams.parameterGroups
      ).reduce((groups, groupId) => {
        if (groupId === 'Content Blocker') {
          // Update parameters within the Content Blocker group
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
      await axiosInstance.post('/remote-config', configParams);
      setisLoading(false);
      toast.success('Content Blocker updated successfully');
      setOpen(true);
    } catch (error) {
      console.error('Error updating Remote Config:', error);
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
        Content Blocker
      </p>

      {configParams?.parameterGroups ? (
        <form className="flex flex-col gap-7">
          <div className=" bg-white dark:bg-[#333438] border shadow-lg border-[#ffffff1a]   p-3 rounded-lg">
            <div className="flex flex-col gap-2">
              {Object.keys(
                configParams.parameterGroups['Content Blocker'].parameters
              ).map((paramName) => (
                <div
                  key={paramName}
                  className="flex items-center gap-14 text-black lg:gap-40 text-sm my-2"
                >
                  {configParams.parameterGroups['Content Blocker'].parameters[
                    paramName
                  ]?.valueType === 'STRING' ? (
                    <div className="bg-[#ebedef] text-black w-full bg-transparent flex flex-col gap-2 rounded-lg p-2 ">
                      <label className="dark:text-[#FDFDFD]">
                        {
                          configParams.parameterGroups['Content Blocker']
                            .parameters[paramName]?.description
                        }
                      </label>
                      <input
                        type="text"
                        value={
                          configParams.parameterGroups['Content Blocker']
                            .parameters[paramName]?.defaultValue.value
                        }
                        onChange={(e) => handleParamChange(e, paramName)}
                        className="bg-transparent dark:text-[#FDFDFD] border w-full outline-none rounded-lg p-2 "
                      />
                    </div>
                  ) : configParams.parameterGroups['Content Blocker']
                      .parameters[paramName]?.valueType === 'BOOLEAN' ? (
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        className="toggle toggle-md checked:bg-white dark:text-[#FDFDFD] bg-transparent"
                        onChange={(e) => handleParamChange(e, paramName)}
                        checked={
                          configParams.parameterGroups['Content Blocker']
                            .parameters[paramName]?.defaultValue.value ===
                          'false'
                            ? false
                            : true
                        }
                      />
                      <label className="dark:text-[#FDFDFD]">
                        {
                          configParams.parameterGroups['Content Blocker']
                            .parameters[paramName]?.description
                        }
                      </label>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap-reverse gap-4">
            <button
              className="bg-slate-950 dark:text-[#FDFDFD] dark:border-[#FDFDFD] px-4  rounded-2xl text-white hover:text-black font-semibold py-2 sm:text-base text-sm border border-black w-fit self-end"
              onClick={handleUpdateConfig}
            >
              Update Content Blocker
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

export default ContentBlocker;
