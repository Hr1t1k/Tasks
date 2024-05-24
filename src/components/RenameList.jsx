import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';

export default (props)=>{
    
    function handleClick(){
        console.log("edit mode");
        props.setEditable(true);
         
    }
    return <>
        <button className={`btn pe-0 `} onClick={handleClick} >
            <EditIcon/>
        </button>
        
    </>
}