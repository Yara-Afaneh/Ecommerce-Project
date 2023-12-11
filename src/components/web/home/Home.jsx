import React from 'react'
import Categories from '../categories/Categories.jsx'
import logo from './../img/logo.jpeg'

export default function Home() {
  return (
    <div className='text-center'>
    <img src={logo} className='img-fluid text-center'/>
     <Categories/>
    </div>
  )
}
