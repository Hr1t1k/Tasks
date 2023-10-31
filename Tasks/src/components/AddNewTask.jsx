import React,{useState} from "react";
import auth from "../config/firebase-config";
import classItems from "../assets/TaskItems.module.css";
import axios from "axios";

export default (props)=>{
    const user=auth.currentUser;
    const [content,setContent]=useState("");
    //console.log(props.taskId);
    function handleChange(event){
        setContent(event.target.value);
    }
    function handleSubmit(event){
        event.preventDefault();
        if(content==="" ||!user){
            return ;
        }
        console.log(user.uid);
        console.log(user.uid);
        axios.post("https://tasksdatabase.onrender.com/addTask",{username:user.uid,list:props.taskId,content:content}).then(res=>{
            props.setTasks(res.data);
        })
        setContent("");
    }
    return <div className={classItems.addnewtask}>
    <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
            <input type="text" onChange={handleChange} value={content} className="form-control  bg-tertiary rounded-3" placeholder="➕ Add new Task" aria-label="tasks" aria-describedby="button-addon2"/>
            <button type="submit"  className="btn  "><svg viewBox="0 0 24 24" width="24px" height="24px" className="GfYBMd v6TC2e"><path d="M6.7,17.9v-3.7l4-1.8c0.4-0.2,0.4-0.7,0-0.9l-4-1.8V6.1L19.8,12L6.7,17.9z M23.7,11.5L5.4,3.3  c-0.1,0-0.1,0-0.2,0C5,3.3,4.7,3.5,4.7,3.8v5.9v4.8v5.9c0,0.3,0.2,0.5,0.5,0.5c0.1,0,0.1,0,0.2,0l18.3-8.2  C24.1,12.3,24.1,11.7,23.7,11.5z"></path></svg></button>
        </div> 
    </form>
</div>
}