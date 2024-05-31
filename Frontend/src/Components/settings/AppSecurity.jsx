import { useState } from 'react';
import { axiosInstance } from '../../axios';
import { toast } from 'react-toastify';

function AppSecurity({ configParams, setConfigParams }) {
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
        if (groupId === 'App Security') {
          // Update parameters within the App Security group
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
      toast.success('App Security Settings updated successfully');
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
    <div className="flex flex-col gap-4">
      <p className="py-3 text-lg text-black dark:text-[#FDFDFD] font-bold">
        App Security
      </p>
      {configParams?.parameterGroups ? (
        <form className="flex flex-col gap-8">
          <div className="dark:bg-[#333438] bg-white shadow-lg border border-[#ffffff1a] p-3 rounded-xl">
            <div className="flex flex-col gap-5 text-black dark:text-[#FDFDFD]">
              {Object.keys(
                configParams.parameterGroups['App Security'].parameters
              ).map((paramName) => (
                <div
                  key={paramName}
                  className="flex items-center text-sm gap-14 lg:gap-40 my-2"
                >
                  {configParams.parameterGroups['App Security'].parameters[
                    paramName
                  ]?.valueType === 'STRING' ? (
                    <div className="flex flex-col w-full gap-3">
                      <label className="dark:text-[#FDFDFD]">
                        {
                          configParams.parameterGroups['App Security']
                            .parameters[paramName]?.description
                        }
                      </label>
                      <input
                        type="text"
                        value={
                          configParams.parameterGroups['App Security']
                            .parameters[paramName]?.defaultValue.value
                        }
                        onChange={(e) => handleParamChange(e, paramName)}
                        className="bg-transparent border dark:text-[#FDFDFD] w-[100%] rounded-lg p-2"
                      />
                    </div>
                  ) : configParams.parameterGroups['App Security'].parameters[
                      paramName
                    ]?.valueType === 'BOOLEAN' ? (
                    <div className="flex items-center w-[100%] gap-4">
                      <input
                        type="checkbox"
                        className="toggle dark:text-[#FDFDFD] toggle-md checked:bg-white bg-white"
                        onChange={(e) => handleParamChange(e, paramName)}
                        checked={
                          configParams.parameterGroups['App Security']
                            .parameters[paramName]?.defaultValue.value ===
                          'false'
                            ? false
                            : true
                        }
                      />

                      <label className="dark:text-[#FDFDFD]">
                        {
                          configParams.parameterGroups['App Security']
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
          <div className="flex flex-wrap gap-5">
            <button
              className="bg-slate-950 dark:text-[#FDFDFD] dark:border-[#FDFDFD] rounded-2xl text-white px-4 font-semibold py-2 sm:text-base text-sm border border-black w-fit self-end"
              onClick={handleUpdateConfig}
            >
              Update App Security
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

export default AppSecurity;
