import React,{useState} from "react";
import {Link, NavLink } from "react-router-dom";
 import Lists from"../assets/Lists.module.css";
import AddNewList from "./modal";
import useList from "../context/ListContext";

export default (props)=>{
    const {lists,setLists}=useList();
    return (
        <div className={` ${Lists.lists} d-flex flex-md-column flex-row flex-nowrap flex-shrink-0 overflow-auto align-items-center align-items-md-start p-0 p-md-4`} >			
            <AddNewList setLists={setLists}/>
            <nav className="nav flex-row flex-md-column flex-nowrap flex-shrink-0 overflow-auto" >

            {lists && lists.map((list)=>{
                return (<>
                    <div className="vr d-md-none"></div>
                    <NavLink key={list.id} className={({ isActive, isPending, isTransitioning }) =>
                        [
                        Lists.listItems,
                        isActive ? Lists.activeList : "",
                        
                        ].join(" ")
                    } to={`/task/${list._id}`}>
                        {list.name}
                    </NavLink>
                    
                    </>
                );
                    
            })}		
            </nav>
		</div>
    );
}