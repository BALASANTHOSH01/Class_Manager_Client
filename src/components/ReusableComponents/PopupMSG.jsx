import { useState, useEffect } from "react";
import { RxCross2 as CrossIcon } from "react-icons/rx";

const PopupMSG = ({ color, value, closePopup }) => {
  const [multipleErrors, setMultipleErrors] = useState(false);

  useEffect(() => {
    if (Array.isArray(value) && value.length > 1) {
      setMultipleErrors(true);
    } else {
      setMultipleErrors(false);
    }
  }, [value]);

  const renderErrorMessages = (value) => {
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-col gap-1 w-[400px] items-center ml-[10%]">
          {value.map((error, index) => (
            <p key={index} className="mb-1">
              {error}
            </p>
          ))}
        </div>
      );
    }
    return <p>{value}</p>;
  };

  return (
    <div className={`flex flex-col items-center ${multipleErrors ? '' : 'flex-row gap-4'} w-[300px] text-white ${color} absolute top-[10%] left-[40%] justify-center py-[5px] px-[3px]`}>
      <div className="bg-white text-red-500 cursor-pointer absolute left-0 h-full flex flex-col justify-center items-center p-1 text-[24px] border border-red-500 font-bold ">
        <CrossIcon onClick={closePopup} />
      </div>
      {renderErrorMessages(value)}
    </div>
  );
};

export default PopupMSG;
