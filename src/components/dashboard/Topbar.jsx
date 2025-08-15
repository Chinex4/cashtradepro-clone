import { Menu, Bell } from "lucide-react";
import { useState } from "react";
import NotificationDropdown from "../navbar/NotificationDropdown";
import { notifications as defaultNotifications } from "../navbar/navbar.config";
import UserDropdown from "../navbar/UserDropdown";
import useFetchLoggedInUser from "../../hooks/useFetchedLoggedInUser";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth/authSlice";

export default function Topbar({ onOpenSidebar }) {
  const { user: fetchedUser } = useFetchLoggedInUser();
  const [dropdowns, setDropdowns] = useState({
    notifications: false,
    user: false,
    assets: false,
  });
  const [activeTab, setActiveTab] = useState("All");
  const [notifications] = useState(defaultNotifications);
  const [unread, setUnread] = useState(notifications.length);
  const markAllAsRead = () => setUnread(0);
  const uid = fetchedUser?.message?.userDetails.uid ?? "";
  const email = fetchedUser?.message?.userDetails.email ?? "";
  const name = fetchedUser?.message?.userDetails.name ?? "";
  const userPic = fetchedUser?.message?.userDetails?.image;

  const userImage = userPic?.startsWith('"') ? JSON.parse(userPic) : userPic;

  const selectedImage = userImage === null ? '/avatar/a1.png' : userImage;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showUID, setShowUID] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(uid);
    toast.success("UID copied!");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };


  const filteredNotifications =
    activeTab === "All"
      ? notifications
      : notifications.filter((n) => n.type === activeTab);
  return (
    <header className="sticky top-0 z-30 h-14 w-full border-b border-zinc-800 bg-[#0F0F0F]/95 backdrop-blur py-8 supports-[backdrop-filter]:bg-[#0F0F0F]/80">
      <div className="mx-auto flex h-full max-w-full items-center justify-between px-3 sm:px-5">
        <button
          className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-700 hover:bg-zinc-800/60"
          onClick={onOpenSidebar}
          aria-label="Open navigation"
        >
          <Menu />
        </button>
        <div className="">
          <img className="w-32" src="/cashtradepro-logo2.png" alt="" />
        </div>
        <div className="flex items-center gap-2">
          <NotificationDropdown
            unread={unread}
            dropdowns={dropdowns}
            setDropdowns={setDropdowns}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            filteredNotifications={filteredNotifications}
            markAllAsRead={markAllAsRead}
          />
          {/* <div className="ml-1 h-9 w-9 rounded-full bg-zinc-700/60" /> */}
          <div className="flex items-center gap-3">
            <UserDropdown
              email={email}
              uid={uid}
              showUID={showUID}
              setShowUID={setShowUID}
              handleCopy={handleCopy}
              handleLogout={handleLogout}
              selectedImage={selectedImage}
            />
            <span>
                {name || email}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
