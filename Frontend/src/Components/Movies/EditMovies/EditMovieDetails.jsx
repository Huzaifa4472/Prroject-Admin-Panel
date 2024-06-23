import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";

const EditMovieDetails = React.memo(
  ({ show, handleDeleteLink, i, addLink, handleInputChange }) => {
    const renderDeleteButton = (linkId) => {
      if (show.links.length > 1) {
        return (
          <MdOutlineDeleteOutline
            onClick={() => handleDeleteLink(i, linkId)}
            className="  text-lg text-red-500  cursor-pointer"
          />
        );
      }
      return null;
    };

    return (
      <>
        {show?.links?.map((link, linkId) => (
          <div key={link.id} className="my-8">
            <div className="border-[1px] border-[#C8C8C8] rounded-2xl">
              <div className="flex justify-between w-[100%] mt-2 px-4">
                <h1 className="text-lg font-medium dark:text-[#FDFDFD]">
                  Link {linkId + 1}
                </h1>
                {renderDeleteButton(link.id)}
              </div>
              <div className="flex flex-col md:grid grid-cols-1 md:grid-cols-3 break-words gap-4 p-4 my-2">
                <input
                  type="text"
                  className="border-[1px] border-[#C8C8C8] rounded-lg px-3 py-2 text-black dark:text-white dark:bg-[#333438]  bg-transparent text-base font-normal grow outline-none placeholder:text-base"
                  placeholder="Host"
                  required
                  defaultValue={link.host}
                  onChange={(e) => handleInputChange(e, i, link.id, "host")}
                  name={`host_${i}_${link.id}`}
                />
                <input
                  type="text"
                  className="border-[1px] border-[#C8C8C8] rounded-lg px-3 py-2  dark:bg-[#333438] text-black dark:text-white bg-transparent text-base font-normal grow outline-none placeholder:text-base"
                  placeholder="Size"
                  required
                  defaultValue={link.size}
                  onChange={(e) => handleInputChange(e, i, link.id, "size")}
                  name={`size_${i}_${link.id}`}
                />
                <input
                  type="text"
                  className="border-[1px] border-[#C8C8C8] rounded-lg px-3 py-2  dark:bg-[#333438] text-black dark:text-white bg-transparent text-base font-normal grow outline-none placeholder:text-base"
                  placeholder="Quality"
                  required
                  defaultValue={link.quality}
                  onChange={(e) => handleInputChange(e, i, link.id, "quality")}
                  name={`quality_${i}_${link.id}`}
                />
                <input
                  type="text"
                  className="border-[1px] border-[#C8C8C8] rounded-lg px-3 py-2  dark:bg-[#333438] text-black dark:text-white bg-transparent text-base font-normal grow outline-none placeholder:text-base col-span-3"
                  placeholder="URL"
                  required
                  defaultValue={link.url}
                  onChange={(e) => handleInputChange(e, i, link.id, "url")}
                  name={`url_${i}_${link.id}`}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => addLink(i)}
          className="border-[1.5px] border-[#1D1C1C] text-black dark:text-[#FDFDFD] dark:border-[#FDFDFD] rounded-xl font-medium text-sm my-8 px-3 py-2 flex gap-1 items-center"
        >
          <AiFillPlusCircle size={22} /> Add New Link
        </button>
      </>
    );
  }
);

export default EditMovieDetails;
