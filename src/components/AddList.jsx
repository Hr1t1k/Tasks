import React, { useState } from "react";
import axios from "axios";
import useList from "../context/ListContext";
import { useNavigate, useLocation } from "react-router-dom";
import auth from "../config/firebase-config";
import ObjectID from "bson-objectid";
export default () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_DATABASE_URL,
    headers: {
      Authorization: `Bearer ${auth.currentUser?.accessToken}`,
    },
  });
  const uid = localStorage.getItem("uid");
  const [text, setText] = useState("");
  const [error, setError] = useState(true);
  const { setLists } = useList();
  const navigate = useNavigate();
  function handleChange(event) {
    setText(event.target.value);
    if (event.target.value === "") setError(true);
    else setError(false);
  }

  function handleClick() {
    const id = ObjectID();
    instance.post(`/list`, { name: text, listId: id }).then((response) => {
      setLists((prevList) => [...prevList, response.data]);
      if (response.data) navigate(`/task/${response.data._id}`);
    });
  }
  return (
    <div className="flex flex-nowrap " style={{ minWidth: "155px" }}>
      <button
        type="button"
        className="btn active mb-md-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <h3 className="m-0">My Lists +</h3>
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title "
                style={{ color: "black" }}
                id="exampleModalLabel"
              >
                Add new List
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body input-group input-group-lg">
              <input
                type="text"
                required={true}
                onChange={handleChange}
                value={text}
                className="form-control"
                placeholder="Enter new List name"
              ></input>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleClick}
                className="btn btn-dark"
                data-bs-dismiss={error ? "" : "modal"}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
