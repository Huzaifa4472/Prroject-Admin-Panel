const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="flex gap-4 bg-[#1d1c1c] dark:bg-[#333438] rounded-xl w-full grow items-center p-8 justify-between">
      <div className="text-[#f1efef] flex flex-col gap-2">
        <p className="text-[36px] font-medium">{title}</p>
        <p className="text-[40px] font-bold">{value}</p>
      </div>
      {icon}
    </div>
  );
};
export default DashboardCard;
