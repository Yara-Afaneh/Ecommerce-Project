import axios from "axios";
import { createContext, useEffect, useState } from "react"


export const UserContext=createContext();


export default function USerContextProvider({children}) {
 const [userToken,setUserToken]=useState(null);
 const [userData,setUserData]=useState(null);

const getUserData= async()=>{
    if(userToken){
        const {data}=await axios.get(`https://ecommerce-node4.vercel.app/user/profile`,  
        {headers:{authorization:`Tariq__${userToken}`}})
        setUserData(data.user);
        
    }}
useEffect( ()=>{
    getUserData();
},[userToken])


   

  return <UserContext.Provider value={{userToken,setUserToken,userData,setUserData,getUserData}}>
    {children}
  </UserContext.Provider>
}


