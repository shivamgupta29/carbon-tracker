import { useState } from "react";

const LPG = ({ onChange }) => {
  const [value, setValue] = useState("");

  const handleValueChange = (e) => {
    const newValue = e.target.value;

    const maxValue = 5;

    if (newValue > maxValue) {
      alert(`Maximum allowed value is ${maxValue} cylinders.`);
      return;
    }

    //If the value is valid, update the state and inform the parent
    setValue(newValue);
    onChange({ subtype: "cylinder", value: Number(newValue) });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-purple-400 mb-4">LPG</h3>
      <div>
        <label
          htmlFor="lpg-value"
          className="block text-sm font-medium text-gray-300"
        >
          Cylinders (this month)
        </label>
        <input
          type="number"
          id="lpg-value"
          value={value}
          min="0"
          max="5"
          onChange={handleValueChange}
          className="mt-1 block w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="e.g., 1"
        />
      </div>
    </div>
  );
};

export default LPG;
