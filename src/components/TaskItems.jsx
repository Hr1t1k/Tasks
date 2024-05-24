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
  const params = useParams();
  const id = params.taskId;
  const [tasks, setTasks] = useState(null);
  const uid = auth.currentUser.uid;
  const [name, setName] = useState("");
  useEffect(() => {
    if (uid) {
      axios
        .post(`${import.meta.env.VITE_DATABASE_URL}/getTasks`, {
          username: uid,
          list: id,
        })
        .then((response) => {
          setTasks(response.data[0]);
          setName(response.data[1]);
        });
    }
  }, [params]);

  return (
    <>
      <ActiveList name={name} setName={setName} id={id} />
      <div className={classItems.tasks} style={{ height: "80%" }}>
        <div className={classItems.box} style={{ height: "100%" }}>
          <div className={`${classItems.boxContent} , overflow-auto`}>
            {tasks ? (
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
          <AddNewTask taskId={id} setTasks={setTasks} />
        </div>
      </div>
    </>
  );
};
