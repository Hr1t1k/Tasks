import React, { useEffect, useState } from "react";
import auth from "../config/firebase-config.js";
import {
  Outlet,
  useNavigate,
  useLocation,
  useNavigation,
} from "react-router-dom";
import Header from "./Header.jsx";
import Lists from "./Lists.jsx";
import axios from "axios";
import dashboard from "../assets/Dashboard.module.css";
import useList from "../context/ListContext.js";
import { ListProvider } from "../context/ListContext.js";
export default () => {
  // const { setLists } = useList();
  const instance = axios.create({
    baseURL: import.meta.env.VITE_DATABASE_URL,
    headers: {
      Authorization: `Bearer ${auth.currentUser?.accessToken}`,
    },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const navigation = useNavigation();
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    instance
      .get(`/list`)
      .then((response) => {
        setLists(response.data);
        if (location.pathname === "/" && response.data) {
          navigate(`/task/${response.data[0]._id}`);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (location.pathname === "/" && response.data) {
      navigate(`/task/${response.data[0]._id}`);
    }
  }, [location.pathname]);

  return (
    <>
      {auth.currentUser && (
        <div
          className={`container-fluid d-flex flex-column m-0 p-0 ${dashboard.main}`}
        >
          <div className="col-12 flex-shrink-0">
            <Header />
          </div>
          <div
            className="container-fluid col-12 p-0 m-0 overflow-auto d-flex flex-column flex-md-row"
            style={{
              maxHeight: "calc(100vh - 72.31px)",
              height: "calc(100vh - 72.31px)",
            }}
          >
            <div
              className={` ${dashboard.lists}    flex-fill  overflow-auto flex-grow-0 flex-shrink-0 `}
              style={{ minWidth: "270px" }}
              // style={{
              //   maxHeight: "calc(100vh - 72.31px)",
              //   height: "calc(100vh - 72.31px)",
              // }}
            >
              {
                <ListProvider value={{ lists, setLists }}>
                  <Lists loading={loading} />
                </ListProvider>
              }
            </div>
            <div
              className={` flex-fill px-md-5 overflow-auto ${
                navigation.state === "loading" ? "loading" : ""
              }`}
              // style={{ height: "calc(100vh - 53px)" }}
            >
              <ListProvider value={{ lists, setLists }}>
                <Outlet />
              </ListProvider>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
