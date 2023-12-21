import React from 'react'
import Categories from '../categories/Categories.jsx'
import Homeimage from './../img/Homeimage.png';
import './Home.css'
import { Link } from 'react-router-dom';


export default function Home() {
  return (
    <div className='text-center '>
      <div className="image row align-items-center text-center">
        <div className="col-lg-6">
        <h2 className=' fs-1'>Welcome To Yara Shop </h2>
      <p className='fs-3 py-2'>Shopping is Alot Easier Now !!</p>
      <Link className='py-3 px-5 fs-3' to={'categories'}>Shop Now</Link>
        </div>
      
      <img src={Homeimage} className='img-fluid col-lg-5'/>
      </div>
    
     <Categories/>
    </div>
  )
}
