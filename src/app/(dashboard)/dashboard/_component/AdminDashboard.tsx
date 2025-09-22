"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import HomeCard from "./HomeCard";
import DashboardTimeline from "./DashboardTimeline";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface User {
  id: number;
  name: string;
  email: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const userChartState:any = {
    series: [
      {
        name: "Users",
        data: users.map((u) => u.id * 10),
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
        toolbar: { show: false },
      },
      xaxis: {
        categories: users.map((u) => u.name),
      },
      stroke: { curve: "smooth", width: 3 },
      colors: ["#FF6B6B"],
      dataLabels: { enabled: false },
      grid: { borderColor: "#e7e7e7" },
    },
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <HomeCard title="Total Users" percentage={users.length.toString()} total={users.length.toString()} />
        <HomeCard title="Total Merchants" percentage="87" total="87" />
        <HomeCard title="Pending Approvals" percentage="12" total="12" />
        <HomeCard title="System Alerts" percentage="5" total="5" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <div className="bg-white p-4 rounded shadow h-full">
            <h6 className="text-gray-500 mb-3">User Growth Overview</h6>
            {!loading && (
              <ReactApexChart
                options={userChartState.options}
                series={userChartState.series}
                type="line"
                height={350}
              />
            )}
            {loading && <p>Loading chart...</p>}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white p-4 rounded shadow h-[100%]">
            <h6 className="text-gray-500 mb-3">Admin Activities</h6>
            <DashboardTimeline />
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-white p-4 rounded shadow h-full overflow-x-auto table-responsive">
            <h6 className="text-gray-500 mb-3">Pending Approvals</h6>
            <table className=" border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 ">User/Merchant</th>
                  <th className="p-2 ">Email</th>
                  <th className="p-2 ">Type</th>
                  <th className="p-2 ">Status</th>
                  <th className="p-2 ">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="p-2 ">{user.name}</td>
                    <td className="p-2 ">{user.email}</td>
                    <td className="p-2 ">User</td>
                    <td className="p-2 ">Pending</td>
                    <td className="p-2 ">
                      <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">Approve</button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white p-4 rounded shadow h-auto">
            <h6 className="mb-3 flex items-center">
              <span className="text-red-500">System Alerts</span>
            </h6>
            <hr className="mb-3" />
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Backup Required</strong>
                <br />
                <small className="text-gray-500">Last backup was 7 days ago</small>
              </li>
              <li>
                <strong>Server CPU High</strong>
                <br />
                <small className="text-gray-500">CPU at 85%</small>
              </li>
              <li>
                <strong>Pending Merchants</strong>
                <br />
                <small className="text-gray-500">12 merchants waiting approval</small>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
