import { useState } from 'react';
import { axiosInstance } from '../../axios';
import { toast } from 'react-toastify';

function AdsSetting({ configParams, setConfigParams }) {
  const [isLoading, setisLoading] = useState(false);
  const handleParamChange = (e, paramName, groupId) => {
    const value =
      e.target.type === 'checkbox'
        ? e.target.checked.toString()
        : e.target.value;

    // Copy configParams and parameterGroups
    const updatedConfigParams = { ...configParams };
    const updatedParameterGroups = { ...updatedConfigParams.parameterGroups };

    // Check if the groupId exists in parameterGroups
    if (updatedParameterGroups[groupId]) {
      // Copy parameters for the current group
      const updatedParameters = {
        ...updatedParameterGroups[groupId].parameters,
      };

      // Update the specific parameter value
      updatedParameters[paramName] = {
        ...updatedParameters[paramName],
        defaultValue: { value: value },
      };

      // Update parameters for the current group
      updatedParameterGroups[groupId] = {
        ...updatedParameterGroups[groupId],
        parameters: updatedParameters,
      };

      // Update configParams with the updated parameterGroups
      updatedConfigParams.parameterGroups = updatedParameterGroups;
      setConfigParams(updatedConfigParams);
    }
  };

  const handleUpdateConfig = async (e) => {
    setisLoading(true);

    e.preventDefault();
    try {
      await axiosInstance.post('/remote-config', configParams);
      setisLoading(false);
      toast.success('Ads Settings updated successfully');
    } catch (error) {
      console.error('Error updating Remote Config:', error);
      setisLoading(false);
      toast.error(`Error: ${error.message}`);
    }
  };
  if (isLoading) {
    return (
      <div className="text-center  border border-[#ffffff1a] bg-white p-3 rounded-lg">
        <p className="loading loading-ring loading-lg"></p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <p className=" text-black text-2xl py-3 font-bold dark:text-[#FDFDFD]">
        Ads Settings
      </p>
      {configParams?.parameterGroups ? (
        <form className="flex flex-col gap-5">
          {Object.keys(configParams.parameterGroups).map((groupId) => {
            if (groupId.toLowerCase().includes('ads')) {
              return (
                <div
                  key={groupId}
                  className=" bg-white dark:bg-[#333438] dark:text-[#FDFDFD] border border-[#ffffff1a] rounded-lg my-4 p-3"
                >
                  <p className=" text-black dark:text-[#FDFDFD] font-bold py-3">
                    {groupId}
                  </p>
                  {Object.keys(
                    configParams.parameterGroups[groupId].parameters
                  ).map((paramName) => (
                    <div
                      key={paramName}
                      className="flex text-sm  gap-14 lg:gap-20 py-5 my-2"
                    >
                      {configParams.parameterGroups[groupId].parameters[
                        paramName
                      ]?.valueType === 'STRING' ? (
                        <div className=" flex flex-col  w-[1000%] gap-4">
                          <label className=" text-black dark:text-[#FDFDFD] font-medium">
                            {
                              configParams.parameterGroups[groupId].parameters[
                                paramName
                              ]?.description
                            }
                          </label>
                          <input
                            type="text"
                            value={
                              configParams.parameterGroups[groupId].parameters[
                                paramName
                              ]?.defaultValue.value
                            }
                            onChange={(e) =>
                              handleParamChange(e, paramName, groupId)
                            }
                            className="bg-[#ebedef] text-black dark:text-[#FDFDFD] bg-transparent border border-[#C8C8C8] rounded-lg p-2 "
                          />
                        </div>
                      ) : configParams.parameterGroups[groupId].parameters[
                          paramName
                        ]?.valueType === 'BOOLEAN' ? (
                        <div className=" flex flex-row items-center w-[100%] gap-4">
                          <input
                            type="checkbox"
                            className="toggle toggle-md checked:bg-white bg-white border-none"
                            onChange={(e) =>
                              handleParamChange(e, paramName, groupId)
                            }
                            checked={
                              configParams.parameterGroups[groupId].parameters[
                                paramName
                              ]?.defaultValue.value === 'false'
                                ? false
                                : true
                            }
                          />
                          <label className=" text-black dark:text-[#FDFDFD] font-medium text-sm">
                            {
                              configParams.parameterGroups[groupId].parameters[
                                paramName
                              ]?.description
                            }
                          </label>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
                </div>
              );
            } else {
              return null;
            }
          })}
          <div className="flex flex-wrap gap-5">
            <button
              className="bg-slate-950 dark:text-[#FDFDFD] dark:border-[#FDFDFD] px-4  rounded-2xl  text-white  font-semibold py-2 sm:text-base text-sm border border-black w-fit  self-end"
              onClick={handleUpdateConfig}
            >
              Update Ads Settings
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

export default AdsSetting;
