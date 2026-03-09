import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
// import DashboardPage from "./pages/Dashboard";
import TrackingPage from "./pages/Tracking";
import TruckTrackingPage from "./pages/Tracking/TruckTracking";
import TemporalSummary from "./pages/Tracking/TemporalSummary";
import OperatorPerformance from "./pages/Tracking/OperatorPerformance";
import TruckDashboard from "./pages/Truck";
import ConsumedByPeriods from "./pages/Truck/ConsumedByPeriods";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TruckTrackingPage />} />
          <Route path="tracking" element={<TrackingPage />} />
          <Route path="tracking/summary" element={<TemporalSummary />} />
          <Route path="tracking/operator-performance" element={<OperatorPerformance />} />
          <Route path="truck/dashboard" element={<TruckDashboard />} />
          <Route path="consumed-by-periods" element={<ConsumedByPeriods />} />
          {/* <Route path="dashboard/gps-bd" element={<DashboardPage />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
