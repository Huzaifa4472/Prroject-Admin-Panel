import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom/dist";
import InAppAnnouncement from "../../Components/settings/InAppAnnouncement";
import AppConfig from "../../Components/settings/AppConfig";
import AppSecurity from "../../Components/settings/AppSecurity";
import PlayStoreAppsChecker from "../../Components/settings/PlayStoreAppsChecker";
import ContentBlocker from "../../Components/settings/ContentBlocker";
import LocationFilter from "../../Components/settings/LocationFilter";
import AppUpdator from "../../Components/settings/AppUpdator";
import AdsSetting from "../../Components/settings/AdsSetting";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../../axios";

function AdminPanel() {
  const [configParams, setConfigParams] = useState();
  const [open, setOpen] = useState(false);

  const location = useLocation();
  useEffect(() => {
    fetchRemoteConfig();
  }, [location.pathname]);

  const fetchRemoteConfig = async () => {
    try {
      const response = await axiosInstance.get("/remote-config");
      const data = await response.data;
      setConfigParams(data);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching Remote Config:", error.message);
    }
  };

  return (
    <div className="lg:mt-0 300px:mt-16  min-h-[90%] w-[100%] lg:ml-0 px-2 md:px-6 py-4  ">
      <div className="flex flex-col gap-5 ">
        <Routes>
          <Route
            path="/ads"
            element={
              <AdsSetting
                configParams={configParams}
                setConfigParams={setConfigParams}
              />
            }
          />
          <Route
            path="/AppSecurity"
            element={
              <AppSecurity
                configParams={configParams}
                setConfigParams={setConfigParams}
              />
            }
          />
          <Route
            path="/location_Filter"
            element={
              <LocationFilter
                configParams={configParams}
                setConfigParams={setConfigParams}
                setOpen={setOpen}
              />
            }
          />
          <Route
            path="/content_blocker"
            element={
              <ContentBlocker
                configParams={configParams}
                setConfigParams={setConfigParams}
              />
            }
          />
          <Route
            path="/InAppAnnouncement"
            element={
              <InAppAnnouncement
                configParams={configParams}
                setConfigParams={setConfigParams}
                setOpen={setOpen}
              />
            }
          />
          <Route
            path="/appconfig"
            element={
              <AppConfig
                configParams={configParams}
                setConfigParams={setConfigParams}
              />
            }
          />

          <Route
            path="/App_Updater"
            element={
              <AppUpdator
                configParams={configParams}
                setConfigParams={setConfigParams}
              />
            }
          />
          <Route
            path="/Play_Store_Apps_Checker"
            element={
              <PlayStoreAppsChecker
                configParams={configParams}
                setConfigParams={setConfigParams}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPanel;
