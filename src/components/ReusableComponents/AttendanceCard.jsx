import React from "react";

const AttendanceCard = ({ name, value }) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <p className="w-[110px]">{name}</p>:{" "}
      <p className="w-[110px]">{value}</p>
    </div>
  );
};

export default AttendanceCard;
