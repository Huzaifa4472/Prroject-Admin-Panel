import { MdOutlineDeleteOutline } from 'react-icons/md';

const EditNewMovie = ({ i, handleDeleteLink, link }) => {
  return (
    <div className="border-[1px] border-[#C8C8C8] rounded-2xl">
      <div className="flex  justify-end w-[100%] mt-2">
        <MdOutlineDeleteOutline
          onClick={() => handleDeleteLink(i, link.id)}
          className="flex w-[10%] text-lg text-red-500 items-center"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
        <input
          type="text"
          className="border-[1px] border-[#C8C8C8] rounded-lg px-3 py-2 text-[#1D1C1C] dark:bg-[#333438] dark:text-[#FDFDFD] text-base font-normal grow outline-none placeholder:text-base"
          placeholder="Host 1"
          required
          defaultValue={link.host}
          onChange={(e) => handleInputChange(e, i, link.id, 'host')}
          name={`host_${i}_${link.id}`}
        />
        <input
          type="text"
          className="border-[1px] border-[#C8C8C8] rounded-lg px-3 py-2 text-[#1D1C1C] dark:bg-[#333438] dark:text-[#FDFDFD] text-base font-normal grow outline-none placeholder:text-base"
          placeholder="200 MB"
          required
          defaultValue={link.size}
          onChange={(e) => handleInputChange(e, i, link.id, 'size')}
          name={`size_${i}_${link.id}`}
        />
        <input
          type="text"
          className="border-[1px] border-[#C8C8C8] rounded-lg px-3 py-2 text-[#1D1C1C] dark:bg-[#333438] dark:text-[#FDFDFD] text-base font-normal grow outline-none placeholder:text-base"
          placeholder="HD"
          required
          defaultValue={link.quality}
          onChange={(e) => handleInputChange(e, i, link.id, 'quality')}
          name={`quality_${i}_${link.id}`}
        />
        <input
          type="text"
          className="border-[1px] border-[#C8C8C8] rounded-lg px-3 py-2 text-[#1D1C1C] dark:bg-[#333438] dark:text-[#FDFDFD] text-base font-normal grow outline-none placeholder:text-base col-span-3"
          placeholder="www.themoviedb.org/tv/2316-the-office"
          required
          defaultValue={link.url}
          onChange={(e) => handleInputChange(e, i, link.id, 'url')}
          name={`url_${i}_${link.id}`}
        />
      </div>
    </div>
  );
};
export default EditNewMovie;
