import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/Usercontext.jsx'
import Loader from '../loader/Loader.jsx';
import style from './Profile.module.css';
import { Link, Outlet } from 'react-router-dom';


export default function Profile() {
  let {userData,loading}=useContext(UserContext);

  if(loading){
    return <Loader/>
  }

    
    
    

  return (
    <>
    <h1 className='my-5 text-center'>Profile Page </h1>
    <aside className={`${style.profile}`}>
      
      <div className={`${style.profileLinks}`}>
          <nav>
              <Link to={'info'}>User Information </Link>
              <Link to={'contact'}> Contact Information</Link>
              <Link to={'order'}> Orders </Link>
              
          </nav>
      </div>
      <div className={`${style.userData}`}>
        <Outlet/>
      </div>
    </aside>
    </>
  )
}
