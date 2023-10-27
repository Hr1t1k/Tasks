import React from "react";
import classItems from "../assets/TaskItems.module.css"
export default (props)=>{
    return (
        <>
            <div className={classItems.tasks}>
				<div className={classItems.box}>
					<div className={classItems.boxContent}>

					</div>
					<div className={classItems.addnewtask}>
						<form>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control  bg-tertiary rounded-3" placeholder="➕ Add new Task" ariaLabel="tasks" ariaDescribedby="button-addon2"/>
                                <button type="submit"  className="btn  "><svg viewBox="0 0 24 24" width="24px" height="24px" className="GfYBMd v6TC2e"><path d="M6.7,17.9v-3.7l4-1.8c0.4-0.2,0.4-0.7,0-0.9l-4-1.8V6.1L19.8,12L6.7,17.9z M23.7,11.5L5.4,3.3  c-0.1,0-0.1,0-0.2,0C5,3.3,4.7,3.5,4.7,3.8v5.9v4.8v5.9c0,0.3,0.2,0.5,0.5,0.5c0.1,0,0.1,0,0.2,0l18.3-8.2  C24.1,12.3,24.1,11.7,23.7,11.5z"></path></svg></button>
                            </div> 
                        </form>
					</div>
				</div>
			</div>
        </>
    )
}