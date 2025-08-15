import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  LineChart,
  History,
  Wallet,
  DollarSign,
  Bell,
  User,
  Image as ImageIcon,
  Layers,
} from "lucide-react";
import { logout } from "../../redux/auth/authSlice";
import { useDispatch } from "react-redux";

const linkBase =
  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors";
const inactive = "text-zinc-300 hover:bg-zinc-800/60 hover:text-white";
const active = "bg-zinc-800 text-white border border-zinc-700";

export default function Sidebar({ onNavigate }) {
  const items = [
    { to: "/dashboard/overview", label: "Dashboard", icon: LayoutDashboard },
    { to: "/dashboard/market", label: "Market", icon: LineChart },
    { to: "/dashboard/history", label: "History", icon: History },
    { to: "/dashboard/deposit", label: "Deposit", icon: Wallet },
    { to: "/dashboard/withdrawal", label: "Withdrawal", icon: DollarSign },
    { to: "/dashboard/choose-plan", label: "Choose a Plan", icon: Layers },
    { to: "/dashboard/notifications", label: "Notifications", icon: Bell },
    { to: "/dashboard/profile", label: "Profile", icon: User },
    {
      to: "/dashboard/upload-profile-pic",
      label: "Upload Profile Pic",
      icon: ImageIcon,
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
      dispatch(logout());
      navigate("/login");
    };

  return (
    <nav className="p-3 space-y-1">
      {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
      ))}
        <button
            onClick={handleLogout}
            className={`${linkBase} ${inactive} w-full text-left`}  
        >
          <User size={18} />
          <span>Logout</span>
        </button>
    </nav>
  );
}
