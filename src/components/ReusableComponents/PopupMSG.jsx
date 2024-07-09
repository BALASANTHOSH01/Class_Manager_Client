import { RxCross2 as CrossIcon } from "react-icons/rx";

const PopupMSG = ({ color, value, closePopup }) => {
  return (
    <div>
      <div
        className={`flex flex-row gap-4 w-[200px] px-[5px] py-[5px] text-white items-center ${color}`}
      >
        <div className="p-1 rounded-[50%] hover:bg-white hover:text-red-500 cursor-pointer">
          <CrossIcon onClick={closePopup} />
        </div>

        <p>{value}</p>
      </div>

    </div>
  );
};

export default PopupMSG;
