import React from 'react'
import Navbar from './../components/dashboared/navbar/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import Footer from '../components/dashboared/footer/Footer.jsx';

export default function DashedLayout() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}
