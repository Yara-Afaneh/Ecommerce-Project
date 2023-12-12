import axios from "axios";
import { createContext, useEffect, useState } from "react"
import Loader from "../loader/Loader.jsx";


export const UserContext=createContext();


export default function USerContextProvider({children}) {
 const [userToken,setUserToken]=useState(null);
 const [userData,setUserData]=useState(null);
 const [loading,setLoading]=useState(true);

const getUserData= async()=>{
    if(userToken){
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,  
        {headers:{authorization:`Tariq__${userToken}`}})
        setUserData(data.user);
        setLoading(false);
        
    }}
useEffect( ()=>{
    getUserData();
},[userToken])

if(loading){
  <Loader/>
}


   

  return <UserContext.Provider value={{userToken,setUserToken,userData,setUserData,getUserData}}>
    {children}
  </UserContext.Provider>
}


