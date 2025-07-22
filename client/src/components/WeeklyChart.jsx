import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WeeklyChart = ({ data }) => {
  return (
    <div className="bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-800">
      <h3 className="text-2xl font-bold mb-6 text-purple-400 text-center">
        Last 7 Days (kg CO₂)
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" opacity={0.3} />
          <XAxis
            dataKey="date"
            stroke="#a78bfa"
            tick={{ fill: "#d8b4fe", fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            stroke="#a78bfa"
            tick={{ fill: "#d8b4fe", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #4b5563",
              borderRadius: "0.5rem",
              color: "#fff",
            }}
            labelStyle={{ color: "#a78bfa" }}
          />
          <Line
            type="monotone"
            dataKey="totalCO2"
            stroke="#c084fc"
            strokeWidth={3}
            dot={{ r: 5, stroke: "#9333ea", strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 7, fill: "#9333ea" }}
            isAnimationActive={true}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyChart;
