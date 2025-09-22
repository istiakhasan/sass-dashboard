"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import HomeCard from "./HomeCard";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Activity {
  id: number;
  action: string;
  date: string;
}

const UserDashboard = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const mockData: Activity[] = [
          { id: 1, action: "Logged in", date: "2025-09-20" },
          { id: 2, action: "Updated profile", date: "2025-09-21" },
          { id: 3, action: "Placed an order", date: "2025-09-22" },
        ];
        setActivities(mockData);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);


  const activityChartState: any = {
    series: [
      {
        name: "Activity",
        data: [3, 5, 2, 6, 4, 7, 5], 
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 300,
        toolbar: { show: false },
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      colors: ["#176e6d"],
      dataLabels: { enabled: false },
      grid: { borderColor: "#e7e7e7" },
    },
  };
  const pieChartState: any = {
    series: [44, 33, 23],
    options: {
      chart: {
        type: "pie",
      },
      labels: ["Completed", "Pending", "In Progress"],
      colors: ["#10B981", "#F59E0B", "#3B82F6"],
      legend: { position: "bottom" },
    },
  };

  return (
    <div className="p-4">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <HomeCard title="My Orders" percentage="12" total="12" />
        <HomeCard title="Pending Payments" percentage="3" total="3" />
        <HomeCard title="Completed Tasks" percentage="8" total="8" />
        <HomeCard title="Notifications" percentage="4" total="4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <div className="bg-white p-4 rounded shadow h-full">
            <h6 className="text-gray-500 mb-3">My Weekly Activity</h6>
            {!loading && (
              <ReactApexChart
                options={activityChartState.options}
                series={activityChartState.series}
                type="bar"
                height={300}
              />
            )}
            {loading && <p>Loading chart...</p>}
          </div>
        </div>

    <div className="lg:col-span-4">
          <div className="bg-white p-4 rounded shadow h-full">
            <h6 className="text-gray-500 mb-3">Order Status Distribution</h6>
            {!loading && (
              <ReactApexChart
                options={pieChartState.options}
                series={pieChartState.series}
                type="pie"
                height={300}
              />
            )}
            {loading && <p>Loading chart...</p>}
          </div>
        </div>

        {/* My Orders */}
        <div className="lg:col-span-12">
          <div className="bg-white p-4 rounded shadow h-full overflow-x-auto table-responsive">
            <h6 className="text-gray-500 mb-3">My Recent Orders</h6>
            <table className=" ">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2  text-start">Order ID</th>
                  <th className="p-2  text-start">Date</th>
                  <th className="p-2  text-start">Status</th>
                  <th className="p-2  text-start">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="p-2 ">#1021</td>
                  <td className="p-2 ">2025-09-20</td>
                  <td className="p-2  text-green-600">Completed</td>
                  <td className="p-2 ">$150</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-2 ">#1022</td>
                  <td className="p-2 ">2025-09-21</td>
                  <td className="p-2  text-yellow-600">Pending</td>
                  <td className="p-2 ">$80</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="p-2 ">#1023</td>
                  <td className="p-2 ">2025-09-22</td>
                  <td className="p-2  text-blue-600">Processing</td>
                  <td className="p-2 ">$200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
