import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import {
  fetchSummary,
  fetchWeeklySummary,
  fetchMonthlySummary,
  fetchAiInsight,
} from "../services/api";
import WeeklyChart from "../components/WeeklyChart"; // We will create this
import MonthlyChart from "../components/MonthlyChart";

const DashboardPage = () => {
  const [summary, setSummary] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [isActivityAddedToday, setIsActivityAddedToday] = useState(false);
  const [aiInsight, setAiInsight] = useState("");
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const [summaryRes, weeklyRes, monthlyRes] = await Promise.all([
          fetchSummary().catch(() => ({ data: [] })),
          fetchWeeklySummary().catch(() => ({ data: [] })),
          fetchMonthlySummary().catch(() => ({ data: [] })),
        ]);

        setSummary(summaryRes.data);
        setWeeklyData(weeklyRes.data);
        setMonthlyData(monthlyRes.data);

        if (summaryRes.data.length > 0) {
          setIsActivityAddedToday(true);

          const userProfile = JSON.parse(localStorage.getItem("user"));
          const userName = userProfile?.name?.split(" ")[0] || "there";

          const aiRes = await fetchAiInsight(summaryRes.data, userName);
          setAiInsight(aiRes.data.insight);
        } else {
          setAiInsight(
            "Log your first activity for today to get a personalized tip!"
          );
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setAiInsight("Could not load AI insight. Please try again later.");
      } finally {
        setIsGeneratingInsight(false);
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
          <h2 className="text-3xl font-bold text-purple-400">Your Progress</h2>
          <br />
          <Link
            to="/add-activity"
            className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors"
          >
            + Add Activity
          </Link>
          {/* Display the Insight Card */}
          <div className="bg-purple-800/20 border border-purple-600 p-4 rounded-xl mb-8 flex items-center">
            <span className="text-2xl mr-4">💡</span>
            {isGeneratingInsight ? (
              <p className="text-purple-200 italic">
                Generating your personalized tip...
              </p>
            ) : (
              <p className="text-purple-200">{aiInsight}</p>
            )}
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {summary.length > 0 ? (
              summary.map((item) => (
                <div
                  key={item.type}
                  className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all transform hover:-translate-y-1"
                >
                  <h3 className="text-sm font-bold uppercase text-gray-400 tracking-wider">
                    {item.type}
                  </h3>
                  <p className="text-4xl font-bold text-green-400 mt-2">
                    {item.totalCO2.toFixed(2)}
                    <span className="text-2xl text-gray-300"> kg CO₂</span>
                  </p>
                  <p className="text-gray-500 mt-1">
                    ₹{item.totalCost.toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              // Placeholder for when data is loading or empty
              <div className="bg-gray-800 p-6 rounded-xl text-center col-span-full">
                <p>No activity logged for today yet.</p>
              </div>
            )}
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
