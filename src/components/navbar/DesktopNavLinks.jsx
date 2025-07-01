// components/navbar/DesktopNavLinks.jsx
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const DesktopNavLinks = ({ navLinks }) => {
  return (
    <div className="hidden lg:flex items-center gap-3">
      {navLinks.map((link, index) => (
        <div className="dropdown dropdown-hover" key={index}>
          <div className="relative">
            {link.dropdown ? (
              <button className="btn btn-ghost btn-sm cursor-pointer hover:bg-transparent text-[11px] rounded-btn flex items-center gap-1 px-2">
                {link.name}
                <ChevronDown size={16} />
                {link.badge && (
                  <span className="bg-lime-400 absolute -top-1 -right-3 text-black text-[6px] px-1 py-0.5 rounded">
                    {link.badge}
                  </span>
                )}
              </button>
            ) : (
              <Link
                to={link.path}
                className="btn btn-ghost btn-xs cursor-pointer hover:bg-transparent px-2 rounded-btn relative flex items-center gap-1 text-[11px]"
              >
                {link.name}
                {link.badge && (
                  <span className="bg-lime-400 absolute -top-1 -right-3 text-black text-[6px] px-1 py-0.5 rounded">
                    {link.badge}
                  </span>
                )}
              </Link>
            )}
          </div>
          {link.dropdown && (
            <ul className="dropdown-content gap-5 menu px-4 py-6 rounded-lg shadow bg-[#0D0D0D] text-white w-52">
              {link.dropdownItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex gap-3 items-center cursor-pointer"
                >
                  <span className="text-lime-400">
                    {item.icon && <item.icon size={20} />}
                  </span>
                  <span>{item.text}</span>
                </Link>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default DesktopNavLinks;
