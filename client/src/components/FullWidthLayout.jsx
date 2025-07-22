import Header from "./Header";
import { Outlet } from "react-router-dom";

const FullWidthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default FullWidthLayout;
