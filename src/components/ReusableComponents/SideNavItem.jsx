import { Link } from "react-router-dom";


const DashboardSideNavItem = ({ icon, name,isSideNavHovered,className,pageLink }) => {
  return (
    <Link to={pageLink} className={`flex ${isSideNavHovered ? 'flex-row gap-2 items-center text-[18px]' : 'flex-col items-center justify-center text-[22px]'}  hover:bg-gray-200 w-[100%] px-[2%] h-[12vh] cursor-pointer ${className}`}>
      <div className={`${isSideNavHovered && 'ml-[15%]'}`}>{icon}</div>
      {
        isSideNavHovered && (
          <p className="">{name}</p>
        )
      }
    </Link>
  );
};

export default DashboardSideNavItem;
