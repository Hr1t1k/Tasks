import {createContext,useContext} from "react";
export const TaskContext=createContext({
    lists:null,
    setLists:()=>{}

});
export const TaskProvider=TaskContext.Provider;
export default function useTask(){
    return useContext(TaskContext)
}