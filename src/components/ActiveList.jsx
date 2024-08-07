import React, { useState } from "react";
import DeleteList from "./DeleteList";
import RenameList from "./RenameList";
import useList from "../context/ListContext";
// import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import ClickAwayListener from "react-click-away-listener";

import { useParams, useNavigate } from "react-router-dom";
import classItems from "../assets/TaskItems.module.css";
import axios from "axios";
import auth from "../config/firebase-config";
export default (props) => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_DATABASE_URL,
    headers: {
      Authorization: `Bearer ${auth.currentUser?.accessToken}`,
    },
  });
  const currList = props.list;
  const { setLists } = useList();
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(currList.name);

  const id = currList._id;
  const uid = localStorage.getItem("uid");
  const navigate = useNavigate();
  function handleChange(event) {
    setName(event.target.value);
  }

  const handleClickAwayEvent = () => {
    setEditable(false);
  };
  function handleSubmit(event) {
    event.preventDefault();
    if (name.trim() === "") return;
    instance
      .put("/list", { _id: id, name: name })
      .then((response) => {
        setLists((prev) =>
          prev.map((item) => (item._id === id ? { ...item, name: name } : item))
        );
        setEditable(false);
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  }
  return (
    <div className={classItems.activeList}>
      <ClickAwayListener onClickAway={handleClickAwayEvent}>
        <div className="d-flex overflow-hidden">
          {editable && (
            <form onSubmit={handleSubmit} className="d-flex">
              <input
                onChange={handleChange}
                type="text"
                className="form-control "
                value={name}
              ></input>
              <button type="submit" onClick={handleSubmit} className="btn  ">
                <svg
                  viewBox="0 0 24 24"
                  width="24px"
                  height="24px"
                  className="GfYBMd v6TC2e"
                >
                  <path d="M6.7,17.9v-3.7l4-1.8c0.4-0.2,0.4-0.7,0-0.9l-4-1.8V6.1L19.8,12L6.7,17.9z M23.7,11.5L5.4,3.3  c-0.1,0-0.1,0-0.2,0C5,3.3,4.7,3.5,4.7,3.8v5.9v4.8v5.9c0,0.3,0.2,0.5,0.5,0.5c0.1,0,0.1,0,0.2,0l18.3-8.2  C24.1,12.3,24.1,11.7,23.7,11.5z"></path>
                </svg>
              </button>
            </form>
          )}

          {!editable && (
            <div className="p-0 m-0 d-flex overflow-hidden  mw-100">
              <div
                className="flex-fill text-truncate overflow-hidden mw-100"
                style={{ maxWidth: "calc(100% - 1000px)" }}
              >
                {name}{" "}
              </div>
              <RenameList
                listid={id}
                setEditable={setEditable}
                setLists={setLists}
              />
              <DeleteList
                setLists={setLists}
                listId={id}
                default={currList.default}
              />
            </div>
          )}
        </div>
      </ClickAwayListener>
    </div>
  );
};
