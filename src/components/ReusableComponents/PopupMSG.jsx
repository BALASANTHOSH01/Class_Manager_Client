import { RxCross2 as CrossIcon } from "react-icons/rx";

const PopupMSG = ({ color, value, closePopup }) => {
  return (
    <div>
      <div className={`flex flex-row gap-4 w-[300px] text-white items-center ${color} absolute top-[10%] left-[40%] justify-center`}>
        <div className="bg-white text-red-500 cursor-pointer absolute left-0 h-full flex flex-col justify-center items-center p-1 text-[24px] border border-red-500 font-bold">
          <CrossIcon onClick={closePopup} />
        </div>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default PopupMSG;
