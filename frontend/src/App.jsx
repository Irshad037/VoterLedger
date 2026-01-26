
import React from "react";
import { useRoutes, useLocation } from "react-router-dom";
import { routes } from "./utils/AppRoutes";
import Navbar from "./components/MainComponents/Navbar";
import ScrollToTop from "./components/MainComponents/ScrollToTop";
import Footer from "./components/MainComponents/Footer";

const App = () => {
  const routing = useRoutes(routes);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAdminPath && <Navbar />}
      {routing}
      <Footer />
    </>
  );
};

export default App;
