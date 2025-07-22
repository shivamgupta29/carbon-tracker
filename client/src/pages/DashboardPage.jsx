import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import {
  fetchSummary,
  fetchWeeklySummary,
  fetchMonthlySummary,
} from "../services/api";
import WeeklyChart from "../components/WeeklyChart"; // We will create this
import MonthlyChart from "../components/MonthlyChart";

const DashboardPage = () => {
  const [summary, setSummary] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const [summaryRes, weeklyRes, monthlyRes] = await Promise.all([
          fetchSummary(),
          fetchWeeklySummary(),
          fetchMonthlySummary(),
        ]);
        setSummary(summaryRes.data);
        setWeeklyData(weeklyRes.data);
        setMonthlyData(monthlyRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };
    getData();
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex flex-col-reverse lg:flex-row">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-3xl font-bold text-purple-400">Your Dashboard</h2>
          <br />
          <Link
            to="/add-activity"
            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors"
          >
            + Add Activity
          </Link>

          {/* Summary Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {summary.map((item) => (
              <div
                key={item.type}
                className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                <h3 className="font-bold text-lg capitalize text-gray-200">
                  {item.type}
                </h3>
                <p className="text-2xl font-semibold text-green-400">
                  {item.totalCO2.toFixed(2)} kg CO₂
                </p>
                <p className="text-gray-400">₹{item.totalCost.toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <WeeklyChart data={weeklyData} />
            <MonthlyChart data={monthlyData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
