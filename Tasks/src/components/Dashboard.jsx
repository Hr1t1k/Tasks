import React, { useEffect, useState } from "react";
import auth from "../config/firebase-config";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import {
  Outlet,
  useNavigate,
  useLocation,
  useNavigation,
} from "react-router-dom";
import Header from "./Header.jsx";
import Lists from "./Lists";
import axios from "axios";
import dashboard from "../assets/Dashboard.module.css";
import useList from "../context/ListContext";
import { ListProvider } from "../context/ListContext.js";
export default () => {
  // const { setLists } = useList();
  const navigate = useNavigate();
  const location = useLocation();
  const navigation = useNavigation();
  const [lists, setLists] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        axios
          .post(`${import.meta.env.VITE_DATABASE_URL}/`, { username: user.uid })
          .then((response) => {
            setLists(response.data);
            if (location.pathname === "/" && response.data) {
              navigate(`/task/${response.data[0]._id}`);
            }
          });
      } else {
        console.log("Navigated");
        navigate("/getStarted");
      }
    });
  }, []);

  return (
    <div className={`container-fluid m-0 p-0 ${dashboard.main}`}>
      <div className="col-12">
        <Header />
      </div>
      <div className="container-fluid p-0 m-0">
        <div className="row h-100 m-0 p-0">
          <div className={`  col-12  col-lg-3 col-md-3 ${dashboard.lists}`}>
            {
              <ListProvider value={{ lists, setLists }}>
                <Lists />
              </ListProvider>
            }
          </div>
          <div
            className={`col-12 col-lg-9 col-md-9 ${
              navigation.state === "loading" ? "loading" : ""
            }`}
            style={{ height: "calc(100vh - 53px)" }}
          >
            <ListProvider value={{ lists, setLists }}>
              <Outlet />
            </ListProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
