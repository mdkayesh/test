import React, { useEffect, useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200 || document.documentElement.scrollTop >= 200) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        scroll ? "shadow-lg" : ""
      } fixed top-0 left-0 w-full bg-white z-50 transition-shadow duration-300 px-6 py-4`}
    >
      <div className="max-w-3xl mx-auto">
        <nav className="flex justify-between items-center">
          <Link to={"/"} className="logo text-primary text-3xl">
            <BsInfoCircleFill />
          </Link>
          <ul className="flex gap-5 items-center [&_.active]:text-primary [&_.active]:underline">
            <li>
              <NavLink to={"/"} className={"font-semibold"}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/info"} className={"font-semibold"}>
                Info
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
