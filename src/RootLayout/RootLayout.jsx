import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Modal from "../components/Modal";

const RootLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="root-layout">
      <Navbar />
      <Outlet />
      <Modal />
    </div>
  );
};

export default RootLayout;
