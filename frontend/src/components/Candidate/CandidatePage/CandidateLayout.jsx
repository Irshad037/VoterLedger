import React from "react";
import { Outlet } from "react-router-dom";
import CandidateSidebar from "../CandidateComponents/CandidateSidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-100">
      <CandidateSidebar />
      <div className="flex-1 overflow-y-auto hide-scrollbar p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
