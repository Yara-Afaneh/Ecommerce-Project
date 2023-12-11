import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/Usercontext.jsx'


export default function Profile() {
  let {userData}=useContext(UserContext);


    
    
    

  return (
    <aside className='container'>
      <h1 className='my-5'>Profile Page </h1>
      <div className='d-flex mx-5'>
        <img src={userData.image.secure_url} className='w-25'/>
      <div className='mx-5'>
       <h2>User Name:{userData.userName}</h2>
       <h2>Email:{userData.email}</h2>
       </div>
       </div>
 
    </aside>
  )
}
