import React,{useState} from "react";
import { NavLink } from "react-router-dom";

export default (props)=>{
    const lists=props.lists;
    const setLists=props.setLists;
    return (
        <div id="lists">
				<ul>
					<h3>My Lists +</h3>
					{lists.map((list)=>{
						return <li>
							<NavLink
                                to={`/dashboard/${list.id}`}
                                className={({isActive}) =>`block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`}
                            >
                                {list.name}
                            </NavLink>
						</li>
					})}
				</ul>          
			</div>

    );
}