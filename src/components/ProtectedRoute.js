import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
const ProtectedRoute = () => {
    const data = sessionStorage.getItem("userInfo");
    const navigate = useNavigate();

    if (!data) {
        navigate("/login")
        return;
    }
  return (
    <div>
      <h1>lol</h1>
    </div>
  );
}

export default ProtectedRoute;
