
import React from "react";
import { useRoutes, useLocation } from "react-router-dom";
import { routes } from "./utils/AppRoutes";
import Navbar from "./components/MainComponents/Navbar";
import ScrollToTop from "./components/MainComponents/ScrollToTop";
import Footer from "./components/MainComponents/Footer";
import { Toaster } from "react-hot-toast";


const App = () => {
  const routing = useRoutes(routes);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <>
      <Toaster />
      <ScrollToTop />
      {!isAdminPath && <Navbar />}
      {routing}
      <Footer />
    </>
  );
};

export default App;
