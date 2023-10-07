import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { AdminHome } from "../pages/admin/AdminHome";
import { CartPage } from "../pages/CartPage";
import { ProtectedRoute } from "./ProtectedRoutes";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="admin/:product"
        element={
          <ProtectedRoute>
            <AdminHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="admin/products/:create"
        element={
          <ProtectedRoute>
            <AdminHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="admin/:register-manager"
        element={
          <ProtectedRoute>
            <AdminHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="admin/schedule-import/:history"
        element={
          <ProtectedRoute>
            <AdminHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="admin/schedule-export/:exporthistory"
        element={
          <ProtectedRoute>
            <AdminHome />
          </ProtectedRoute>
        }
      />

      <Route path="cart" element={<CartPage />} />

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
};
