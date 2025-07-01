// components/navbar/AuthButtons.jsx
import { Link } from "react-router-dom";

const AuthButtons = () => (
  <>
    <Link to="/login" className="hidden lg:block">
      Log in
    </Link>
    <Link
      to="/register"
      className="px-6 py-2 rounded-md hover:bg-lime-300 transition-colors bg-lime-400 text-black"
    >
      Sign Up
    </Link>
  </>
);

export default AuthButtons;
