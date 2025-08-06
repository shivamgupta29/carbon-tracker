import axios from "axios";
//Axios is  library for making HTTP requests

const API = axios.create({ baseURL: "http://localhost:5000/api" });

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
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
export const fetchClimateNews = () => {
  // We will search for "climate change" in India
  const NEWS_URL = `https://newsapi.org/v2/everything?q=climate+change+India&apiKey=${NEWS_API_KEY}&pageSize=5`;
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
