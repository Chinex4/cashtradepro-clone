import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const MobileNavDrawer = ({ isOpen, setIsOpen, navLinks }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className='fixed top-0 right-0 h-full w-full md:w-72 bg-black text-white p-4 z-50 lg:hidden'
    >
      <div className='flex justify-between items-center mb-6'>
        <Link
          to='/'
          className='text-lime-400 font-bold text-xl italic flex items-center gap-1'
        >
          <div className='bg-lime-400 rounded-full p-1'></div> Cashtradepro
        </Link>
        <button onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>
      </div>

      <ul className='flex flex-col gap-4'>
        {navLinks.map((link) =>
          link.dropdown && link.dropdownItems ?
            link.dropdownItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path} onClick={() => setIsOpen(false)}>
                  {item.text}
                </Link>
              </li>
            ))
          : link.path ?
            <li key={link.name}>
              <Link to={link.path} onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
            </li>
          : null
        )}
      </ul>
    </motion.div>
  );
};

export default MobileNavDrawer;
