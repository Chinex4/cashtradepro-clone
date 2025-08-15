import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

const Overview = lazy(() => import("./dashboard/Overview.jsx"));
const Market = lazy(() => import("./dashboard/Market.jsx"));
const History = lazy(() => import("./dashboard/History.jsx"));
const Deposit = lazy(() => import("./dashboard/Deposit.jsx"));
const Withdrawal = lazy(() => import("./dashboard/Withdrawal.jsx"));
const ChoosePlan = lazy(() => import("./dashboard/ChoosePlan.jsx"));
const Notifications = lazy(() => import("./dashboard/Notifications.jsx"));
const Profile = lazy(() => import("./dashboard/Profile.jsx"));
const UploadProfilePic = lazy(() => import("./dashboard/UploadProfilePic.jsx"));
const Orders = lazy(() => import("./dashboard/Orders.jsx"));

export default function DashboardRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<Overview />} />
        <Route path="market" element={<Market />} />
        <Route path="history" element={<History />} />
        <Route path="deposit" element={<Deposit />} />
        <Route path="withdrawal" element={<Withdrawal />} />
        <Route path="choose-plan" element={<ChoosePlan />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="upload-profile-pic" element={<UploadProfilePic />} />
        <Route path="orders/*" element={<Orders />} />
      </Routes>
    </Suspense>
  );
}
