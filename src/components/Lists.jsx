import React,{useState} from "react";
import {NavLink } from "react-router-dom";
import Lists from"../assets/Lists.module.css";
import AddNewList from "./AddList";
import useList from "../context/ListContext";
import Skeleton from '@mui/material/Skeleton';

export default (props)=>{
    const {lists,setLists}=useList();
    return (
        <div className={` ${Lists.lists} d-flex flex-md-column flex-row flex-nowrap flex-shrink-0 overflow-auto align-items-center align-items-md-start p-0 p-md-4`} >			
            <AddNewList setLists={setLists}/>
            <nav className="nav flex-row flex-md-column flex-nowrap flex-shrink-0 overflow-auto" >

            {lists?lists.map((list)=>{
                return (<>
                    <div className="vr d-md-none"></div>
                    <NavLink key={list.id} className={({ isActive, isPending, isTransitioning }) =>
                        [
                        Lists.listItems,
                        isActive ? Lists.activeList : "",
                        isPending? "pending":"",
                        isTransitioning?"transitioning":"",
                        ].join(" ")
                    } to={`/task/${list._id}`}>
                        {list.name}
                    </NavLink>
                    
                    </>
                );
                    
            }):
            <div  className="d-flex d-md-block align-items-center">  
                <Skeleton variant="text" sx={{ fontSize: '1.5rem' ,bgcolor:"lightGray", width:"100px" ,margin:"0px 10px"}} />
                <Skeleton variant="text" sx={{ fontSize: '1.5rem' ,bgcolor:"lightGray", width:"80px",margin:"0px 10px"}} />
            </div>
            }		
            </nav>
		</div>
    );
}