const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
// Load environment variables
dotenv.config();
//connecting to databse
connectDB();
const app = express();
//Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/activities", require("./routes/activityRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
// A basic route to test the server
app.get("/", (req, res) => {
  res.send("API is running...");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
