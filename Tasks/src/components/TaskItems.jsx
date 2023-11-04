import React,{useEffect, useState,useRef} from "react";
import {useParams,useLocation, useNavigate } from "react-router-dom";
import classItems from "../assets/TaskItems.module.css";
import axios from "axios";
import auth from "../config/firebase-config";
import TaskContent from "./TaskContent";
import AddNewTask from "./AddNewTask";
import { onAuthStateChanged } from "firebase/auth";
import DeleteList from "./DeleteList";
import RenameList from "./RenameList";
import useList from "../context/ListContext";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Skeleton } from "@mui/material";

export default (props)=>{
    const params=useParams();
    const id=params.taskId;
    const [tasks,setTasks]=useState(null);
    const user = auth.currentUser;
    const [editable,setEditable]=useState(false);
    const [name,setName]=useState("");
    const {lists,setLists}=useList();
    const navigate=useNavigate();
    function handleChange(event){
        setName(event.target.value);
    }
    
    const handleClickAwayEvent = () => { 
        console.log("should hide");
        setEditable(false); 
      }; 
    function handleSubmit(event){
        event.preventDefault();
        axios.post(
            "https://tasksdatabase.onrender.com/renameList",{username:user.uid,listId:id,newListName:name},
          ).then((response) => {
            setLists(response.data);
          }).catch(error=>{
            console.log(error)
            navigate("/");
          });
    }
    useEffect(()=>{
        onAuthStateChanged(auth,(user) => {
        axios.post(
            "https://tasksdatabase.onrender.com/getTasks",{username:user.uid,list:id},
          ).then((response) => {
            setTasks(response.data[0]);
            setName(response.data[1]);
          })
        })
    },[params,user]);
    
    return (
        <>
            <div  className={classItems.activeList}>
                    <ClickAwayListener onClickAway={handleClickAwayEvent}>
                    <div className="d-flex">
                    {editable && <form  onSubmit={handleSubmit} className="d-flex">
                            <input onChange={handleChange} type="text" className="form-control " value={name} ></input>
                            <button type="submit"  className="btn  "><svg viewBox="0 0 24 24" width="24px" height="24px" className="GfYBMd v6TC2e"><path d="M6.7,17.9v-3.7l4-1.8c0.4-0.2,0.4-0.7,0-0.9l-4-1.8V6.1L19.8,12L6.7,17.9z M23.7,11.5L5.4,3.3  c-0.1,0-0.1,0-0.2,0C5,3.3,4.7,3.5,4.7,3.8v5.9v4.8v5.9c0,0.3,0.2,0.5,0.5,0.5c0.1,0,0.1,0,0.2,0l18.3-8.2  C24.1,12.3,24.1,11.7,23.7,11.5z"></path></svg></button>
                    </form>}
                    
                 
                    {!editable && (<>
                        <div>{name} </div>
                        <RenameList listid={id} setEditable={setEditable} setLists={setLists}/>
                        <DeleteList setLists={setLists} listId={id}/>
                    </> 
                )}
                </div>
                </ClickAwayListener>   
                
            </div>
            <div className={classItems.tasks} style={{height:"80%"}}>
				<div className={classItems.box} style={{height:"100%"}}>
					<div className={`${classItems.boxContent} , overflow-auto`}>
                            {
                                tasks?tasks.map((task)=>{
                                return <TaskContent task={task} key={task._id} id={task._id} listId={id}  setTasks={setTasks}/>
                                }):
                                <div  className="align-items-center">  
                                    <Skeleton variant="text" sx={{ fontSize: '1.5rem' ,bgcolor:"lightGray", width:"100%" ,margin:"0px 10px"}} />
                                    <Skeleton variant="text" sx={{ fontSize: '1.5rem' ,bgcolor:"lightGray", width:"80%",margin:"0px 10px"}} />
                                    <Skeleton variant="text" sx={{ fontSize: '1.5rem' ,bgcolor:"lightGray", width:"70%" ,margin:"0px 10px"}} />
                                    <Skeleton variant="text" sx={{ fontSize: '1.5rem' ,bgcolor:"lightGray", width:"80%",margin:"0px 10px"}} />
                                </div>          
                            }         
					</div>
					<AddNewTask  taskId={id} setTasks={setTasks}/>
				</div>
			</div>
        </>
    )
}