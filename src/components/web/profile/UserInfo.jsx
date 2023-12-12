import React, { useContext } from 'react'
import { UserContext } from '../context/Usercontext.jsx';

export default function UserInfo() {
    let {userData,loading}=useContext(UserContext);
 

    if(loading){
      return <Loader/>
    }
  return (
    <div>
       <h2>User Name:{userData.userName}</h2>
       <h3>Profile Picture</h3>
       <img src={userData.image.secure_url}/>
    </div>
  )
}