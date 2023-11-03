import React,{useState} from "react";
import axios from "axios";
import auth from "../config/firebase-config";
import DeleteIcon from '@mui/icons-material/Delete';
import { Outlet, useNavigate } from "react-router-dom";
import useList from "../context/ListContext";
export default (props)=>{
    const user=auth.currentUser;
    const navigate=useNavigate();
    const {setLists} =useList();
    function handleClick(){
        axios.post("https://tasksdatabase.onrender.com/deleteList",{username:user.uid,listId:props.listId})
        .then((response) => {
            console.log("lists returned for delete",response.data);
            setLists(response.data);
            if(response.data)navigate("/");

        });
    }
    return <>
        <button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#deleteList"><DeleteIcon/></button>
        <div className="modal fade" id="deleteList" tabIndex="-1" aria-labelledby="deleteList" aria-hidden="true">
            <div className="modal-dialog  modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title " style={{color:"black"}} id="deleteList">Delete List</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body ">
                   <p style={{fontSize:"22px"}}> Are you sure you want to delete this list? This will delete all the tasks in this list.</p>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" onClick={handleClick} className="btn btn-dark" data-bs-dismiss="modal">Confirm Delete</button>
                </div>
            </div>
            </div>
        </div>
    </>
}