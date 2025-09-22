"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getRoleWiseMenu } from "@/utils/menuItems";

const Sidebar = ({ activeMenu, setActiveMenu }: any) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <div
      style={{ color: "rgba(0,0,0,.8)" }}
      className={`flex flex-col shadow-2xl transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
  
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <h1 className="font-semibold text-lg text-black">{localStorage?.getItem('role')}</h1>}
        <button
          className="text-black text-xl"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <i className={isCollapsed ? "ri-menu-line" : "ri-close-line"}></i>
        </button>
      </div>

 
      <ul className="mt-4 flex-1">
        {getRoleWiseMenu(localStorage.getItem('role') || 'admin')?.map((item:any) => (
          <li
            key={item.id}
            onClick={() => {
              router.push(item?.path)
              setActiveMenu(item.name)
            }}
            className={`flex items-center gap-3 p-3 mb-1 cursor-pointer hover:bg-[#176e6d] hover:text-white transition ${
              activeMenu?.toLowerCase() === item?.path?.split('/')[1]?.toLowerCase() ? "bg-[#176e6d] font-semibold text-white" : ""
            }`}
          >
            <i className={`${item.icon} text-lg`}></i>
            {!isCollapsed && <span className="text-sm">{item.name}</span>}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm transition cursor-pointer hover:text-red-600"
        >
          <i className="ri-logout-box-line"></i>
          {!isCollapsed && "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
