// Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { logout } from "../redux/auth/authSlice";
import useFetchLoggedInUser from "../hooks/useFetchedLoggedInUser";

import {
  navLinks,
  notifications as defaultNotifications,
} from "./navbar/navbar.config";

import Logo from "./navbar/Logo";
import DesktopNavLinks from "./navbar/DesktopNavLinks";
import AuthButtons from "./navbar/AuthButtons";
import SearchWrapper from "./navbar/SearchWrapper";
import AssetsDropdown from "./navbar/AssetsDropdown";
import UserDropdown from "./navbar/UserDropdown";
import NotificationDropdown from "./navbar/NotificationDropdown";
import QrDropdown from "./navbar/QrDropdown";
import LanguageCurrencyTrigger from "./navbar/LanguageCurrencyTrigger";
import MobileUserTrigger from "./navbar/MobileUserTrigger";
import MobileNavDrawer from "./navbar/MobileNavDrawer";
import UserMobileDrawer from "./navbar/UserMobileDrawer";

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem("accessToken");
  const { user: fetchedUser } = useFetchLoggedInUser();

  const uid = fetchedUser?.message?.userDetails.uid ?? "";
  const email = fetchedUser?.message?.userDetails.email ?? "";
  const userPic = fetchedUser?.message?.userDetails?.image;

  const userImage = userPic?.startsWith('"') ? JSON.parse(userPic) : userPic;

  const selectedImage = userImage === null ? '/avatar/a1.png' : userImage;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [showUID, setShowUID] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState("USDT");
  const [dropdowns, setDropdowns] = useState({
    notifications: false,
    user: false,
    assets: false,
  });
  const [activeTab, setActiveTab] = useState("All");
  const [notifications] = useState(defaultNotifications);
  const [unread, setUnread] = useState(notifications.length);


  const handleCopy = () => {
    navigator.clipboard.writeText(uid);
    toast.success("UID copied!");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };


  // Close dropdowns on outside click
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdowns({ notifications: false, user: false, assets: false });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const markAllAsRead = () => setUnread(0);


  const filteredNotifications =
    activeTab === "All" ? notifications : (
      notifications.filter((n) => n.type === activeTab)
    );

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-black text-white px-4 py-4 flex items-center justify-between border-b border-white/10'>
      {/* Left Section */}
      <div className='flex items-center gap-4'>
        <Logo />
        <DesktopNavLinks navLinks={navLinks} />
      </div>

      {/* Right Section */}
      <div className='flex items-center gap-2'>
        {isAuthenticated ?
          <>
            <SearchWrapper />
            <AssetsDropdown
              showBalance={showBalance}
              setShowBalance={setShowBalance}
              selectedCurrency={selectedCurrency}
              setSelectedCurrency={setSelectedCurrency}
            />
            <UserDropdown
              email={email}
              uid={uid}
              showUID={showUID}
              setShowUID={setShowUID}
              handleCopy={handleCopy}
              handleLogout={handleLogout}
              selectedImage={selectedImage}
            />
            <QrDropdown />
            <NotificationDropdown
              unread={unread}
              dropdowns={dropdowns}
              setDropdowns={setDropdowns}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              filteredNotifications={filteredNotifications}
              markAllAsRead={markAllAsRead}
            />
            <LanguageCurrencyTrigger />
            <MobileUserTrigger setIsUserOpen={setIsUserOpen} />
          </>
        : <AuthButtons />}

        {/* Mobile Menu Toggle */}
        <button className='md:hidden' onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Drawers */}
      <UserMobileDrawer
        isUserOpen={isUserOpen}
        setIsUserOpen={setIsUserOpen}
        isAuthenticated={isAuthenticated}
        uid={uid}
        email={email}
        showUID={showUID}
        setShowUID={setShowUID}
        showBalance={showBalance}
        setShowBalance={setShowBalance}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        handleCopy={handleCopy}
        handleLogout={handleLogout}
      />
      <MobileNavDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navLinks={navLinks}
      />
    </nav>
  );
};

export default Navbar;
