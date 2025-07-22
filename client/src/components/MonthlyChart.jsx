import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#8b5cf6", "#a78bfa", "#c4b5fd", "#6d28d9"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white p-3 rounded-lg shadow-lg border border-gray-700">
        <p className="font-semibold text-purple-300">{payload[0].name}</p>
        <p className="text-sm text-gray-300">{`${payload[0].value.toFixed(
          2
        )} kg CO₂`}</p>
      </div>
    );
  }
  return null;
};

const MonthlyChart = ({ data }) => {
  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-purple-400">
        Last 30 Days Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="totalCO2"
            nameKey="type"
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                style={{ transition: "fill 0.3s ease" }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ color: "#e5e7eb" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyChart;
