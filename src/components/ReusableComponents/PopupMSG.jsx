import { useState, useEffect } from "react";
import { RxCross2 as CrossIcon } from "react-icons/rx";

const PopupMSG = ({ color, errors, closePopup }) => {
  const [multipleErrors, setMultipleErrors] = useState(false);

  useEffect(() => {
    if (Array.isArray(errors) && errors.length > 1) {
      setMultipleErrors(true);
    } else {
      setMultipleErrors(false);
    }
  }, [errors]);

  const renderErrorMessages = (errors) => {
    if (Array.isArray(errors)) {
      return (
        <div className="flex flex-col gap-1 w-[400px] items-center ml-[10%]">
          {errors.map((error, index) => (
            <p key={index} className="mb-1">
              {error}
            </p>
          ))}
        </div>
      );
    }
    return <p>{errors}</p>;
  };

  return (
    <div className={`flex flex-col items-center ${multipleErrors ? '' : 'flex-row gap-4'} w-[600px] text-white ${color} absolute top-[10%] left-[27%] justify-center py-[5px] px-[5px]`}>
      <div className="bg-white text-red-500 cursor-pointer absolute left-0 h-full flex flex-col justify-center items-center p-1 text-[24px] border border-red-500 font-bold ">
        <CrossIcon onClick={closePopup} />
      </div>
      <div className="ml-[10%]">
      {renderErrorMessages(errors)}
      </div>
    </div>
  );
};

export default PopupMSG;
