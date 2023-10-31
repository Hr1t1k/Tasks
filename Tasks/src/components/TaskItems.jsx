import React,{useEffect, useState} from "react";
import {useParams,useNavigate } from "react-router-dom";
import classItems from "../assets/TaskItems.module.css";
import axios from "axios";
import auth from "../config/firebase-config";
import TaskContent from "./TaskContent";
import AddNewTask from "./AddNewTask";
import { onAuthStateChanged } from "firebase/auth";
export default (props)=>{
    const params=useParams();
    const id=params.taskId;
    const [tasks,setTasks]=useState([{}]);
    const user = auth.currentUser;
    const navigate=useNavigate();
    useEffect(()=>{
        console.log(user);
        onAuthStateChanged(auth,(user) => {

            console.log(user.uid);
            console.log(id);
        axios.post(
            "http://localhost:4000/getTasks",{username:user.uid,list:id},
          ).then((response) => {
            setTasks(response.data);
            console.log(response.data);
          })
        })
    },[params,user]);
    
    return (
        <>
            <div className={classItems.tasks} style={{height:"80%"}}>
				<div className={classItems.box} style={{height:"100%"}}>
					<div className={`${classItems.boxContent} , overflow-auto`}>
                            {tasks.map((task)=>{
                                return <TaskContent task={task} id={task._id}/>
                            })}         
					</div>
					<AddNewTask  taskId={id} setTasks={setTasks}/>
				</div>
			</div>
        </>
    )
}