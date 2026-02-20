import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AddItem from "../pages/addItem/AddItem";
import Dashboard from "../pages/dashboard/Dashboard";
import EditStock from "../pages/editStock/EditStock";
import GenerateBill from "../pages/generateBill/GenerateBill";

const AppRoutes= () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
            <Dashboard />
        }
      />
      {/* Auth Routes */}
      <Route
        path="/add-item"
        element={
            <AddItem />
        }
      />
      <Route
        path="/edit-stock"
        element={
            <EditStock />
        }
      />
      <Route
        path="/generate-bill"
        element={
            <GenerateBill />
        }
      />
      
    </Routes>
  );
};

export default AppRoutes;
