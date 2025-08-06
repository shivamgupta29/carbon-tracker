import axios from "axios";
//Axios is  library for making HTTP requests

const API = axios.create({
  baseURL: "https://carbon-tracker-server.onrender.com/api",
});

// Add an interceptor to include the token in every request
API.interceptors.request.use((req) => {
  const user = localStorage.getItem("user");
  if (user) {
    // Make sure the token is being added to the headers correctly
    req.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
  }
  return req;
});

// Auth
export const login = (formData) => API.post("/auth/login", formData);
export const signup = (formData) => API.post("/auth/signup", formData);

// Activities
export const fetchActivities = () => API.get("/activities");
export const fetchSummary = () => API.get("/activities/summary");
export const addActivity = (activityData) =>
  API.post("/activities", activityData);
export const getUserProfile = () => API.get("/users/profile");

// News API
const GNEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
export const fetchClimateNews = () => {
  const query = `("climate change" OR "carbon emissions") AND India`;
  const NEWS_URL = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
    query
  )}&lang=en&country=in&max=5&apikey=${GNEWS_API_KEY}`;
  return axios.get(NEWS_URL);
};

// Summaries
export const fetchWeeklySummary = () => API.get("/activities/summary/week");
export const fetchMonthlySummary = () => API.get("/activities/summary/month");

// AI Insights
export const fetchAiInsight = (summary, userName) => {
  return API.post("/ai/generate-insight", { summary, userName });
};
// Carbon Footprint
