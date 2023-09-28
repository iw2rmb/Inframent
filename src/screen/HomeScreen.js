import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();


  // Check if the user is not logged in the redirect to the login page
  const data = sessionStorage.getItem("userInfo");
  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, [data, navigate]);

  return <div>home sreen</div>;
};

export default HomeScreen;
