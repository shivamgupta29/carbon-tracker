import { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import Transport from "../components/activity/Transport";
import Food from "../components/activity/Food";
import Electricity from "../components/activity/Electricity";
import LPG from "../components/activity/LPG";
import { addActivity } from "../services/api";

const AddActivityPage = () => {
  const [activities, setActivities] = useState({});
  const navigate = useNavigate();

  const handleActivityChange = useCallback((category, data) => {
    setActivities((prev) => ({
      ...prev,
      [category]: data,
    }));
  }, []);

  const handleSubmit = async () => {
    for (const type in activities) {
      const activityData = activities[type];

      if (
        (type === "food" || type === "transport") &&
        Array.isArray(activityData)
      ) {
        for (const item of activityData) {
          if (item.value > 0) {
            try {
              await addActivity({
                type,
                subtype: item.subtype,
                value: item.value,
              });
            } catch (error) {
              console.error(
                `Failed to submit ${type} item ${item.subtype}:`,
                error
              );
            }
          }
        }
      } else {
        if (activityData.value > 0) {
          try {
            await addActivity({
              type,
              subtype: activityData.subtype,
              value: activityData.value,
            });
          } catch (error) {
            console.error(`Failed to submit ${type}:`, error);
          }
        }
      }
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="text-purple-400 hover:text-purple-300 mb-4 inline-block"
        >
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-purple-400 text-center">
          Log Your Activities
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-purple-500/30 transition-all">
            <Transport
              onChange={(data) => handleActivityChange("transport", data)}
            />
          </div>
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-purple-500/30 transition-all">
            <Food onChange={(data) => handleActivityChange("food", data)} />
          </div>
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-purple-500/30 transition-all">
            <Electricity
              onChange={(data) => handleActivityChange("electricity", data)}
            />
          </div>
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-purple-500/30 transition-all">
            <LPG onChange={(data) => handleActivityChange("lpg", data)} />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full md:w-1/2 mx-auto block py-3 text-lg font-semibold rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors"
        >
          Submit All Activities
        </button>
      </div>
    </div>
  );
};

export default AddActivityPage;
