import { Link } from "react-router-dom";
import staffDetails from "../../components/demoDetails/staffDetails/staffDetails";
import Button from "../../components/ReusableComponents/Button";
import { IoMdAdd as PlusIcon } from "react-icons/io";

const StaffManagement = () => {
  return (
    <div className=" overflow-hidden">
      <div>
        <Button
          icon={<PlusIcon />}
          pageLink={"/dashboard/create-staff"}
          text={"Create Staff"}
          className={
            "text-white bg-[--primary-purpel] w-[200px] absolute top-[5%] right-[5%]"
          }
        />
      </div>
      <div className=" mt-[7%] grid grid-flow-col gap-3 p-[3%] ">
        {staffDetails.map((student) => (
          <Link
            to={`/dashboard/manage-staff/${student.name}`}
            key={student.rollno}
            className=" flex flex-col gap-1 px-[10%] py-[2px] w-[230px] h-[180px] bg-gray-200 border items-start justify-center cursor-pointer hover:shadow-lg"
          >
            <h1>Name : {student.name}</h1>
            <h1>Institute : {student.institute}</h1>
            <h1>Year : {student.year}</h1>
            <h1>Dept : {student.depart}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StaffManagement;
