import { useState } from "react";

const foodOptions = {
  veg: ["rice", "wheat", "lentils", "paneer"],
  nonveg: ["chicken", "mutton", "fish"],
};

const servingSizes = {
  rice: 0.15,
  wheat: 0.1,
  lentils: 0.1,
  paneer: 0.1,
  chicken: 0.15,
  mutton: 0.15,
  fish: 0.15,
};

const Food = ({ onChange }) => {
  const [itemList, setItemList] = useState([]);
  const [dietType, setDietType] = useState("veg");
  const [subtype, setSubtype] = useState(foodOptions.veg[0]);
  const [servings, setServings] = useState("");

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!servings || Number(servings) <= 0) return;

    const valueInKg = Number(servings) * servingSizes[subtype];
    const newItem = {
      dietType,
      subtype,
      value: valueInKg,
      servings: Number(servings),
    };
    const newItemList = [...itemList, newItem];
    setItemList(newItemList);
    onChange(newItemList);
    setServings("");
  };

  const handleRemoveItem = (indexToRemove) => {
    const newItemList = itemList.filter((_, index) => index !== indexToRemove);
    setItemList(newItemList);
    onChange(newItemList);
  };

  // Corrected Function: Does not call onChange
  const handleDietChange = (e) => {
    const newDietType = e.target.value;
    setDietType(newDietType);
    setSubtype(foodOptions[newDietType][0]); // Just update local state
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-purple-400 mb-4">Food</h3>
      <ul className="space-y-2 mb-4">
        {itemList.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-700 p-2 rounded-lg"
          >
            <span className="text-gray-200">
              {item.servings} serving(s) of {item.subtype}
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
              htmlFor="diet-type"
              className="block text-sm font-medium text-gray-300"
            >
              Diet
            </label>
            <select
              id="diet-type"
              value={dietType}
              onChange={handleDietChange}
              className="mt-1 block w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="veg">Veg</option>
              <option value="nonveg">Non-Veg</option>
            </select>
          </div>
          <div className="flex-1">
            <label
              htmlFor="food-subtype"
              className="block text-sm font-medium text-gray-300"
            >
              Item
            </label>
            <select
              id="food-subtype"
              value={subtype}
              onChange={(e) => setSubtype(e.target.value)}
              className="mt-1 block w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {foodOptions[dietType].map((item) => (
                <option key={item} value={item}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label
            htmlFor="food-servings"
            className="block text-sm font-medium text-gray-300"
          >
            Servings
          </label>
          <input
            type="number"
            id="food-servings"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            className="mt-1 block w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="e.g., 2"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors"
        >
          + Add Food Item
        </button>
      </form>
    </div>
  );
};

export default Food;
