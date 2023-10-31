import React,{useState} from "react";
import {Link, NavLink } from "react-router-dom";
 import Lists from"../assets/Lists.module.css";
export default (props)=>{
    const lists=props.lists;
    const setLists=props.setLists;
    return (
        <div className={` ${Lists.lists} d-flex flex-md-column flex-row flex-shrink-0 align-items-center align-items-md-start p-0 p-md-4`} >			
            <h3 className="m-0" >My Lists +</h3>
            <nav className="nav flex-row flex-md-column " >

            {lists.map((list)=>{
                return <>
                    <NavLink className={({ isActive, isPending, isTransitioning }) =>
                        [
                        Lists.listItems,
                        isActive ? Lists.activeList : "",
                        
                        ].join(" ")
                    } to={`/task/${list.id}`}>
                        {list.name}
                    </NavLink>
                    <div class="vr d-md-none"></div>

                    </>
            })}		
            </nav>
		</div>
    );
}