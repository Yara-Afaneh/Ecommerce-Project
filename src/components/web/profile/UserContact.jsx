import React, { useContext } from 'react'
import { UserContext } from '../context/Usercontext.jsx';

export default function UserContact() {
    let {userData,loading}=useContext(UserContext);
 

    if(loading){
      return <Loader/>
    }
  return (
    <div>
       <h2>Email:{userData.email}</h2>
       <h2>Mobile Number:{userData.phone}</h2>
    </div>
  )
}
