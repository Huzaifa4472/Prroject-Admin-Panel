import React from "react";
import Navbar from "./Navbar";
import SideNav from "./Sidebar/SideNav";
import { FilteredDataProvider } from "../context/FilteredDataContext";

const Layout = ({ childeren }) => {
  return (
    <FilteredDataProvider>
      <div className="flex w-full max-w-[1750px] mx-auto">
        <SideNav />
        <div className="flex flex-col w-full lg:ml-[292px] 300px:ml-5 mr-4">
          <Navbar />
          {childeren}
        </div>
      </div>
    </FilteredDataProvider>
  );
};

export default Layout;
