import { useEffect } from "react";
import { toast } from "react-toastify";

export const ProtectedRoute = ({ children }) => {
  const admin = sessionStorage.getItem("admin") === "true";

  useEffect(() => {
    if (!admin) {
      toast.error("You are not authorized");
    }
  }, [admin]);

  return admin ? children : null;
};
