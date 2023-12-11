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
  const {data}=await axios.get(`https://ecommerce-node4.vercel.app/categories/active?page=1&limit=6`)
  return(data);
 }

 
 const {data,isLoading}= useQuery('web_categories',getCategories);
 if (isLoading){
  return <Loader/>
 }

  return (

  <div className='container'>
    <div class="swiper-slide" data-swiper-autoplay="2000"></div>
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
    onSlideChange={() => console.log('slide change')}
    onSwiper={(swiper) => console.log(swiper)}
  >
    {data?.categories.length? data ?.categories.map((category)=>
    
    <SwiperSlide key={category._id}>
      <Link to={`/products/category/${category._id}`}>
        <img src={category.image.secure_url}/>
      </Link>
    </SwiperSlide>
     ):<h2 className='text-center main-color'>no categories found</h2>}

  </Swiper>
  <div class="swiper-custom-pagination"></div>
  </div>
  )
}
