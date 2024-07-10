

const DashboardSideNavItem = ({ icon, name,isSideNavHovered }) => {
  return (
    <div className={`flex ${isSideNavHovered ? 'flex-row gap-2 items-center text-[18px]' : 'flex-col items-center justify-center text-[22px]'}  hover:bg-gray-200 w-[100%] px-[2%] h-[12vh] cursor-pointer`}>
      <div className={`${isSideNavHovered && 'ml-[15%]'}`}>{icon}</div>
      {
        isSideNavHovered && (
          <p className="">{name}</p>
        )
      }
    </div>
  );
};

export default DashboardSideNavItem;
