import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Products from "../pages/Products";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import ProtectedRoute from "../components/ProtectedRoute";
import RoleProtectedRoute from "../components/RoleProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/add"element={
    <RoleProtectedRoute>
      <AddProduct />
    </RoleProtectedRoute>}/>
<Route
  path="/products/edit/:id"
  element={
    <RoleProtectedRoute>
      <EditProduct />
    </RoleProtectedRoute>
  }
/>    </Routes>
  );
}

export default AppRoutes;