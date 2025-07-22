import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoutes";
import AddActivityPage from "./pages/AddActivityPage";
import ProfilePage from "./pages/ProfilePage";
import FullWidthLayout from "./components/FullWidthLayout";
import Footer from "./components/Footer";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route element={<FullWidthLayout />}>
            <Route path="/add-activity" element={<AddActivityPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
      <div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
