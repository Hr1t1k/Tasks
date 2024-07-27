import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
const Home = () => {
  const location = useLocation();
  const isLoginOrRegister =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/reset-password";
  const signedIn = () => {
    return localStorage.getItem(signedIn) && !isLoginOrRegister;
  };
  // useEffect(() => {
  //   if (auth.currentUser && isLoginOrRegister) {
  //     navigate("/");
  //   } else if (!auth.currentUser && !isLoginOrRegister) {
  //     navigate("/login");
  //   }
  //   setLoading(false);
  // }, [location.pathname]);
  // return <>{!loading && <Outlet />}</>;
  if (signedIn()) return <Outlet />;
  else return <Navigate to="/login" replace />;
};

export default Home;
