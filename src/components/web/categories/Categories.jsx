import React from 'react'
import { useQuery } from 'react-query';
import Loader from '../loader/Loader.jsx';
import axios from 'axios';
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Scrollbar,Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/bundle'
import 'swiper/css/autoplay'
import './Categories.css';
import { Link } from 'react-router-dom';

export default function Categories() {
 


 const getCategories= async ()=>{
  const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?page=total&limit=8`)
  return(data);
 }

 
 const {data,isLoading}= useQuery('web_categories',getCategories);
 if (isLoading){
  return <Loader/>
 }

  return (

  <div className='container'>
    <div className="swiper-slide" data-swiper-autoplay="2000">
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, Autoplay]}
    spaceBetween={50}
    slidesPerView={5}
    navigation
    loop={true}
    
    autoplay={{
      delay:2000
    }}
    pagination={{ 
      el: '.swiper-custom-pagination',
      clickable: true }}
   
  >
    {data?.categories.length? data ?.categories.map((category)=>
    
    <SwiperSlide key={category._id}>
      <Link to={`/products/category/${category._id}`} className='row'>
        <img src={category.image.secure_url} className='col-lg-12'/>
      </Link>
    </SwiperSlide>
     ):<h2 className='text-center main-color'>no categories found</h2>}

  </Swiper>
    </div>
 
  <div className="swiper-custom-pagination"></div>
  </div>
  )
}
