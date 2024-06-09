import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classItems from "../assets/TaskItems.module.css";
import axios from "axios";
import TaskContent from "./TaskContent";
import AddNewTask from "./AddNewTask";
import { Skeleton } from "@mui/material";
import ActiveList from "./ActiveList";
import auth from "../config/firebase-config";

export default (props) => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_DATABASE_URL,
    headers: {
      Authorization: `Bearer ${auth.currentUser?.accessToken}`,
    },
  });
  const params = useParams();
  const id = params.taskId;
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState(null);
  const uid = auth.currentUser.uid;
  const [currList, setCurrList] = useState(null);
  const [name, setName] = useState("");
  useEffect(() => {
    setLoading(true);
    if (uid) {
      instance
        .get(`/task`, {
          params: {
            _id: id,
          },
        })
        .then((response) => {
          setTasks(response.data[0]);
          setCurrList(response.data[1]);
          setName(response.data[1].name);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [params]);

  return (
    <>
      <div className="d-flex flex-column mh-100 h-100">
        {loading ? (
          <Skeleton
            variant="text"
            sx={{
              fontSize: "3rem",
              bgcolor: "lightGray",
              width: "300px",
              margin: "0px 10px",
            }}
          />
        ) : (
          <ActiveList setName={setName} list={currList} />
        )}
        <div
          className={`${classItems.tasks} flex-fill h-100  d-md-block d-flex justify-content-center pb-md-3`}
        >
          <div
            className={`${classItems.box} `}
            //  style={{ height: "100%" }}
          >
            <div className={`${classItems.boxContent} , overflow-auto`}>
              {!loading && tasks ? (
                tasks.map((task) => {
                  return (
                    <TaskContent
                      task={task}
                      key={task._id}
                      id={task._id}
                      listId={id}
                      setTasks={setTasks}
                    />
                  );
                })
              ) : (
                <div className="align-items-center">
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: "1.5rem",
                      bgcolor: "lightGray",
                      width: "90%",
                      margin: "0px 10px",
                    }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: "1.5rem",
                      bgcolor: "lightGray",
                      width: "80%",
                      margin: "0px 10px",
                    }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: "1.5rem",
                      bgcolor: "lightGray",
                      width: "70%",
                      margin: "0px 10px",
                    }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{
                      fontSize: "1.5rem",
                      bgcolor: "lightGray",
                      width: "80%",
                      margin: "0px 10px",
                    }}
                  />
                </div>
              )}
            </div>
            <AddNewTask listId={id} setTasks={setTasks} />
          </div>
        </div>
      </div>
    </>
  );
};
