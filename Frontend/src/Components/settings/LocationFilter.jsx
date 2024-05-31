import { useState } from 'react';
import { axiosInstance } from '../../axios';
import { toast } from 'react-toastify';

function LocationFilter({ configParams, setConfigParams }) {
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
        if (groupId === 'Location Filter') {
          // Update parameters within the Location Filter group
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
      toast.success('Location Settings updated successfully');
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
      <div className="text-center border border-[#ffffff1a] bg-white  p-3 rounded-lg">
        <p className="loading loading-ring loading-lg"></p>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <p className="dark:text-[#FDFDFD] py-3 text-black text-lg font-bold">
        Location Filter
      </p>
      {configParams?.parameterGroups ? (
        <form className="flex flex-col gap-7">
          <div className="bg-white dark:bg-[#333438] dark:text-[#FDFDFD] dark:border-[#FDFDFD]   shadow-lg border border-[#ffffff1a]  p-3 rounded-lg">
            <div className="flex flex-col text-black gap-2">
              {Object.keys(
                configParams.parameterGroups['Location Filter'].parameters
              ).map((paramName) => (
                <div
                  key={paramName}
                  className="flex items-center text-sm gap-14 my-2"
                >
                  {configParams.parameterGroups['Location Filter'].parameters[
                    paramName
                  ]?.valueType === 'STRING' ? (
                    <div className="flex flex-col w-full gap-3 dark:text-[#FDFDFD]">
                      <label className="">
                        {
                          configParams.parameterGroups['Location Filter']
                            .parameters[paramName]?.description
                        }
                      </label>
                      <input
                        type="text"
                        value={
                          configParams.parameterGroups['Location Filter']
                            .parameters[paramName]?.defaultValue.value
                        }
                        onChange={(e) => handleParamChange(e, paramName)}
                        className="bg-[#ebedef] bg-transparent border dark:text-[#FDFDFD] text-[#858585]  rounded-lg p-2 w-full"
                      />
                    </div>
                  ) : configParams.parameterGroups['Location Filter']
                      .parameters[paramName]?.valueType === 'BOOLEAN' ? (
                    <div className="flex flex-row gap-4 items-center">
                      <input
                        type="checkbox"
                        className="toggle toggle-md checked:bg-white dark:text-[#FDFDFD] bg-white w-full"
                        onChange={(e) => handleParamChange(e, paramName)}
                        checked={
                          configParams.parameterGroups['Location Filter']
                            .parameters[paramName]?.defaultValue.value ===
                          'false'
                            ? false
                            : true
                        }
                      />
                      <label className="dark:text-[#FDFDFD]">
                        {
                          configParams.parameterGroups['Location Filter']
                            .parameters[paramName]?.description
                        }
                      </label>
                    </div>
                  ) : configParams.parameterGroups['Location Filter']
                      .parameters[paramName]?.valueType === 'JSON' ? (
                    <select>
                      {JSON.parse(
                        configParams.parameterGroups['Location Filter']
                          .parameters['location_blacklist']?.defaultValue.value
                      ).countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  ) : (
                    ''
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap-reverse gap-4">
            <button
              className="bg-slate-950 dark:text-[#FDFDFD] dark:border-[#FDFDFD]   px-4  rounded-2xl text-white  font-semibold py-2 sm:text-base text-sm border border-black w-fit self-end"
              onClick={handleUpdateConfig}
            >
              Update Location Filter
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

export default LocationFilter;
