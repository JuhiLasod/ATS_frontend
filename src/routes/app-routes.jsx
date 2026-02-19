import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AddItem from "../pages/addItem/AddItem";
import Dashboard from "../pages/dashboard/Dashboard";
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
      
    </Routes>
  );
};

export default AppRoutes;
