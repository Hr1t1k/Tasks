import React,{useState} from "react";
import classItems from "../assets/TaskItems.module.css";
export default (props)=>{
    const [active,setActive]=useState(true);
    function handleClick(event){
        setActive(value=>{return !value});
    }
    return <div onClick={handleClick} className={`${classItems.task} ${active ? classItems.active : classItems.inactive}`}>
        <div className={active?classItems.checkBox:classItems.checkBoxInactive}></div> 
        <div className={active?classItems.checkMark:classItems.checkMarkInactive}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
        </svg>
        </div>
        {props.task.content}
        </div>;
}
