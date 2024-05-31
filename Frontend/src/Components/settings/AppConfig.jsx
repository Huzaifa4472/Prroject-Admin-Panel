import React, { useState, useEffect, useContext } from 'react';
import { configData } from '../../Data/configData';
import { axiosInstance } from '../../axios';
import { DarkModeContext } from '../../context/darkModeContext';
import { toast } from 'react-toastify';

const AppConfig = ({ configParams, setConfigParams }) => {
  console.log('configParams', configParams);

  const { setToastMessage, setOpen } = useContext(DarkModeContext);
  const [checkedStates, setCheckedStates] = useState(
    new Array(configData.length).fill(false)
  );
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    console.log('Initial configParams:', configParams);
  }, [configParams]);

  const handleToggle = (index) => {
    setCheckedStates((prevCheckedStates) =>
      prevCheckedStates.map((item, i) => (i === index ? !item : item))
    );
  };

  const handleParamChange = (e, paramName) => {
    const value =
      e.target.type === 'checkbox'
        ? e.target.checked.toString()
        : e.target.value;

    const updatedConfigParams = { ...configParams };

    if (
      typeof updatedConfigParams.parameterGroups === 'object' &&
      updatedConfigParams.parameterGroups !== null
    ) {
      updatedConfigParams.parameterGroups = Object.keys(
        updatedConfigParams.parameterGroups
      ).reduce((groups, groupId) => {
        if (groupId === 'API/App Config') {
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
    setisLoading(true);

    e.preventDefault();
    try {
      await axiosInstance.post('/remote-config', configParams);
      setisLoading(false);
      toast.success('App Configuration updated successfully', {});
    } catch (error) {
      console.error('Error updating Remote Config:', error);
      setisLoading(false);
      toast.error(`Error: ${error.message}`, {});
    }
  };

  return (
    <div className="min-h-screen">
      <p className="text-black text-lg font-bold py-3 dark:text-[#FDFDFD]">
        App Configuration
      </p>
      {configParams?.parameterGroups ? (
        <form className="flex flex-col gap-8">
          <div className=" bg-white dark:bg-[#333438] border shadow-lg border-[#ffffff1a] p-3 rounded-2xl">
            <div className="flex flex-col gap-2  ">
              {Object.keys(
                configParams.parameterGroups['API/App Config'].parameters
              ).map((paramName) => (
                <div
                  key={paramName}
                  className="flex items-center text-sm gap-14  lg:gap-20 text-[#000000] m-4 "
                >
                  {configParams.parameterGroups['API/App Config'].parameters[
                    paramName
                  ]?.valueType === 'STRING' ? (
                    <div className="flex flex-col gap-3 w-[100%] ">
                      <label className="text-sm font-medium dark:text-[#FDFDFD] text-[#363848]">
                        {
                          configParams.parameterGroups['API/App Config']
                            .parameters[paramName]?.description
                        }
                      </label>
                      <input
                        type="text"
                        value={
                          configParams.parameterGroups['API/App Config']
                            .parameters[paramName]?.defaultValue.value
                        }
                        onChange={(e) => handleParamChange(e, paramName)}
                        className="bg-transparent border dark:text-[#FDFDFD] font-light text-[#363848] w-[100%] rounded-lg p-2 "
                      />
                    </div>
                  ) : configParams.parameterGroups['API/App Config'].parameters[
                      paramName
                    ]?.valueType === 'BOOLEAN' ? (
                    <div className="flex flex-row  items-center gap-4 w-[100%]">
                      <input
                        type="checkbox"
                        className="toggle toggle-md dark:text-[#FDFDFD] checked:bg-white bg-white"
                        onChange={(e) => handleParamChange(e, paramName)}
                        checked={
                          configParams.parameterGroups['API/App Config']
                            .parameters[paramName]?.defaultValue.value ===
                          'false'
                            ? false
                            : true
                        }
                      />
                      <label className="w-[90%] text-sm font-medium dark:text-[#FDFDFD] text-[#363848]">
                        {
                          configParams.parameterGroups['API/App Config']
                            .parameters[paramName]?.description
                        }
                      </label>
                    </div>
                  ) : configParams.parameterGroups['API/App Config'].parameters[
                      paramName
                    ]?.valueType === 'JSON' ? (
                    ''
                  ) : (
                    ''
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-8">
            <button
              className="bg-slate-950  hover:bg-transparent transition-all duration-150 ease-in-out px-4  rounded-2xl text-white hover:text-black font-semibold py-2 sm:text-base text-sm border dark:text-[#FDFDFD] dark:border-[#FDFDFD]  border-black w-fit btn self-end"
              onClick={handleUpdateConfig}
            >
              Update App Configuration
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
};

export default AppConfig;
