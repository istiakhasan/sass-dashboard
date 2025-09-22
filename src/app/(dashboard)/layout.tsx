"use client";
import Sidebar from "@/component/sidebar/Sidebar";
import React, { ReactNode, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [activeMenu, setActiveMenu] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const path=usePathname()
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
    setActiveMenu(path.split('/')[1])
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="flex-1 transition-all duration-300">
        <div className="h-[60px] bg-gray-50 shadow-xl flex items-center px-[20px]">
          <h1 className="text-2xl font-bold text-gray-700 capitalize">{activeMenu}</h1>
        </div>
        <div className="p-[20px] h-[90vh] overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
