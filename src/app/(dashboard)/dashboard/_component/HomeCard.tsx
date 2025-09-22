import React from "react";

const HomeCard = ({ title, percentage, total, icon }: any) => {
  return (
    <div className="">
      <div className="flex justify-between p-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col justify-center">
          {icon && <div className="mb-2">{icon}</div>}

          <p className="text-gray-500 text-sm">{title}</p>

          <p className="flex items-center gap-2 text-xl font-semibold">
            <span>
              <i
                className="ri-arrow-up-s-line text-[#176E6D]"
                style={{ fontSize: "30px" }}
              ></i>
            </span>
            {percentage} <span className="text-sm font-normal">%</span>
          </p>
        </div>

        <div className="flex items-end">
          <span className="flex items-center justify-center w-12 h-12 border-4 border-[#176E6D] rounded-full text-lg font-bold">
            {total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
