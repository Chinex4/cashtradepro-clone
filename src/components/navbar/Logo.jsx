// components/navbar/Logo.jsx
import { Link } from "react-router-dom";

const Logo = () => (
  <Link
    to="/"
    className="text-lime-400 font-bold text-xl italic flex items-center gap-1"
  >
    <img
      src="cashtradepro-logo2.png"
      className="w-[120px] filter"
      // style={{
      //   filter:
      //     "brightness(0) saturate(100%) invert(74%) sepia(19%) saturate(1631%) hue-rotate(42deg) brightness(101%) contrast(91%)",
      // }}
    />
  </Link>
);

export default Logo;
