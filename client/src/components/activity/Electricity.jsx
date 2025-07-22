import { useState } from "react";

const applianceWattage = {
  "AC (1.5 Ton)": 1500,
  Fan: 75,
  "Lightbulb (LED)": 10,
  "TV (LED)": 80,
  Refrigerator: 200,
  "Washing Machine": 500,
  Laptop: 65,
};

const Electricity = ({ onChange }) => {
  const [appList, setAppList] = useState([]);
  const [appliance, setAppliance] = useState("AC (1.5 Ton)");
  const [hours, setHours] = useState("");

  // Helper function to calculate total and inform parent
  const updateTotal = (list) => {
    const totalKWh = list.reduce((total, item) => {
      const watts = applianceWattage[item.appliance];
      const kwh = (watts * item.hours) / 1000;
      return total + kwh;
    }, 0);
    onChange({ subtype: "general", value: totalKWh });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!hours || Number(hours) <= 0 || Number(hours) > 24) return;

    const newItem = { appliance, hours: Number(hours) };
    const newList = [...appList, newItem];
    setAppList(newList);
    updateTotal(newList); // Update parent
    setHours("");
  };

  const handleRemoveItem = (indexToRemove) => {
    const newList = appList.filter((_, index) => index !== indexToRemove);
    setAppList(newList);
    updateTotal(newList); // Update parent
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-purple-400 mb-4">
        Electricity
      </h3>
      <ul className="space-y-2 mb-4">
        {appList.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-700 p-2 rounded-lg"
          >
            <span className="text-gray-200">
              {item.appliance} for {item.hours} hrs
            </span>
            <button
              onClick={() => handleRemoveItem(index)}
              className="text-red-400 hover:text-red-500 text-sm"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddItem} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label
              htmlFor="appliance"
              className="block text-sm font-medium text-gray-300"
            >
              Appliance
            </label>
            <select
              id="appliance"
              value={appliance}
              onChange={(e) => setAppliance(e.target.value)}
              className="mt-1 block w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {Object.keys(applianceWattage).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label
              htmlFor="hours"
              className="block text-sm font-medium text-gray-300"
            >
              Hours Used
            </label>
            <input
              type="number"
              id="hours"
              value={hours}
              min="0"
              max="24"
              onChange={(e) => setHours(e.target.value)}
              className="mt-1 block w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., 4"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors"
        >
          + Add Appliance
        </button>
      </form>
    </div>
  );
};

export default Electricity;
