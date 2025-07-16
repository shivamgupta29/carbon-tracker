const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
// Load environment variables
dotenv.config();
//connecting to databse
connectDB();
const app = express();
//Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
// A basic route to test the server
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
