import {createContext,useContext} from "react";
export const ListContext=createContext({
    lists:null,
    setLists:()=>{}

});
export const ListProvider=ListContext.Provider;
export default function useList(){
    return useContext(ListContext)
}