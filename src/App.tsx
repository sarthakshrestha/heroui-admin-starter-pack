import { Route, Routes } from "react-router-dom";

import Login from "./pages";
import DashboardMain from "./pages/dashboard/dashboard-main";

function App() {
  return (
    <Routes>
      <Route element={<Login />} path="/" />
      <Route element={<DashboardMain />} path="/dashboard" />
    </Routes>
  );
}

export default App;
