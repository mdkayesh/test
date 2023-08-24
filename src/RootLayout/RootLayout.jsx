import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const RootLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="root-layout">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
