import { useState, useEffect } from "react";
import CM_logo from "../../../public/CM_logo.png";
import { motion } from "framer-motion";

const NavBar = () => {
  const [activeNav, setActiveNav] = useState(() => localStorage.getItem("activeNav") || "solutions");

  useEffect(() => {
    localStorage.setItem("activeNav", activeNav);
  }, [activeNav]);

  const navItems = [
    { name: "Solutions", key: "solutions" },
    { name: "About", key: "about" },
    { name: "Resources", key: "resources" },
  ];

  return (
    <div className="w-full flex items-center bg-gray-100 text-[17px] overflow-hidden">
      <div className="flex flex-row items-center w-[70%] justify-start gap-10 pl-[2%]">
        <div className="flex flex-row gap-2 items-center font-medium">
          <img
            src={CM_logo}
            alt="Logo"
            className="w-[40px] h-[40px] bg-black rounded-full"
          />
          <div className="flex flex-row items-center gap-1">
            Class
            <p className="text-[--primary-purpel]">Manager</p>
          </div>
        </div>

        {navItems.map(item => (
          <div
            key={item.key}
            className={`cursor-pointer w-[150px] text-center py-[20px] hover:bg-gray-500 ${
              activeNav === item.key ? "text-[--primary-purpel]" : ""
            }`}
            onClick={() => setActiveNav(item.key)}
          >
            <p>{item.name}</p>
            {activeNav === item.key && (
              <hr className="h-[1.5px] bg-[--primary-purpel] w-[100px] mx-auto" />
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-row items-center w-[30%] justify-end">
        <motion.div
          whileTap={{ scale: 0.6 }}
          className="bg-gray-500 text-white hover:text-white cursor-pointer w-[160px] text-center py-[20px]"
        >
          <p>Contact Sales</p>
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.6 }}
          className="bg-[--primary-purpel] text-white cursor-pointer w-[160px] text-center py-[20px]"
        >
          <p>Register</p>
        </motion.div>
      </div>
    </div>
  );
};

export default NavBar;
