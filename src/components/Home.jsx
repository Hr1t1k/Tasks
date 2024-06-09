import React, { useEffect, useLayoutEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import auth from "../config/firebase-config";
const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const isLoginOrRegister =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/reset-password";
  useEffect(() => {
    if (auth.currentUser && isLoginOrRegister) {
      navigate("/");
    } else if (!auth.currentUser && !isLoginOrRegister) {
      navigate("/login");
    }
    setLoading(false);
  }, [location.pathname]);
  return <>{!loading && <Outlet />}</>;
};

export default Home;
