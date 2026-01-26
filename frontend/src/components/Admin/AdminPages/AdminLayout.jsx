import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../AdminComponets/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-zinc-100 overflow-hidden">
      <AdminSidebar />
      <div className="flex-1  overflow-y-auto hide-scrollbar  p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
