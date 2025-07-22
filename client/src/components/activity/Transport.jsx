import { useState } from "react";

const Transport = ({ onChange }) => {
  const [tripList, setTripList] = useState([]);
  const [subtype, setSubtype] = useState("auto_rickshaw");
  const [value, setValue] = useState("");

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!value || Number(value) <= 0) return;

    const newItem = { subtype, value: Number(value) };
    const newTripList = [...tripList, newItem];

    setTripList(newTripList);
    onChange(newTripList);

    setValue("");
  };

  const handleRemoveItem = (indexToRemove) => {
    const newTripList = tripList.filter((_, index) => index !== indexToRemove);
    setTripList(newTripList);
    onChange(newTripList);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-purple-400 mb-4">Transport</h3>

      {/* List of added trips */}
      <ul className="space-y-2 mb-4">
        {tripList.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-700 p-2 rounded-lg"
          >
            <span className="text-gray-200">
              {item.value} km via {item.subtype.replace("_", " ")}
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

      {/* Form to add a new trip */}
      <form onSubmit={handleAddItem} className="space-y-4">
        <div className="flex gap-4">
          {/* Mode Selection */}
          <div className="flex-1">
            <label
              htmlFor="transport-subtype"
              className="block text-sm font-medium text-gray-300"
            >
              Mode
            </label>
            <select
              id="transport-subtype"
              value={subtype}
              onChange={(e) => setSubtype(e.target.value)}
              className="mt-1 block w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="auto_rickshaw">Auto Rickshaw</option>
              <option value="metro">Metro</option>
              <option value="bike">Bike</option>
            </select>
          </div>

          {/* Distance Input */}
          <div className="flex-1">
            <label
              htmlFor="transport-value"
              className="block text-sm font-medium text-gray-300"
            >
              Distance (km)
            </label>
            <input
              type="number"
              id="transport-value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mt-1 block w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., 10"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors"
        >
          + Add Trip
        </button>
      </form>
    </div>
  );
};

export default Transport;
