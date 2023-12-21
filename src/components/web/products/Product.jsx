import React, {useContext, useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from '../loader/Loader.jsx';
import { CartContext } from '../context/Cart.jsx';
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Scrollbar,Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/bundle'
import 'swiper/css/autoplay'
import Rating from './Rating.jsx';
import './Product.css'






export default function Product() {

 

  const {getOrderContext}=useContext(CartContext)
  const [order,setOrder]=useState([]);
  const navigate= useNavigate();
  const {productId}=useParams();
  const {addToCartContext}=useContext(CartContext)

  const getOrder= async () =>{
    const res = await getOrderContext(); 
  setOrder(res.orders);
}


useEffect(()=>{
  getOrder()
},[])

  const getProductDetails=async ()=>{
    const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`)
    return (data);
  }
  const addToCart=async (productId)=>{
        const result = await addToCartContext(productId);
        navigate('/cart');  
  }

   const {data,isLoading}= useQuery('product-details',getProductDetails);
  
   if (isLoading){
    return <Loader/>
   
   }

  return (
  <>
   <div className='container row'>
   <div className="swiper col-lg-6" data-swiper-autoplay="2000">
     <Swiper modules={[Navigation, Pagination, Scrollbar, Autoplay]} spaceBetween={50} slidesPerView={1} navigation loop={true} autoplay={{ delay: 2000 }} pagination={{ el: '.swiper-custom-pagination', clickable: true }}>
       {data?.product.subImages.map((img, index) => (
         <SwiperSlide key={index}>
           <div>
             <img src={img.secure_url} alt={'product image'} className='w-75' />
           </div>
         </SwiperSlide>
       ))}
     </Swiper>
   </div>

   <div className='col-lg-6 my-5 py-5'>
     <h2>{data.product.name}</h2>
     <h2 className='main-color'>Price: {data.product.price} $</h2>
       <p>Rating: <Rating value={data.avgRating}/></p>
    
     
     <button onClick={() => { addToCart(data.product._id) }} className='addtocart-btn'>Add to cart</button>
   </div>
 </div>
 <div className="container">
      <h2 className='text-center my-5'>Reviews </h2>
   <div className="reviews row text-center ms-5">
   {data.product.reviews.map((review) => (
           <div key={data._id} className='px-5 col-lg-4'>
             <div className="text-center border py-3">
               <img src={review.createdBy.image.secure_url} alt={'user image'} className='img-fluid w-50 my-2'/>
             <h4>{review.createdBy.userName}</h4>
             <p>{review.comment}</p>
             <p>Rating:<Rating value={data.avgRating}/></p>
             </div>
            
            
           </div>))}
         </div>
   {order &&
 (() => {
   for (const ord of order) {
     if (ord.status === 'deliverd' && ord.products.some((product) => product.productId === productId)) {
       return (
         <div className="text-center my-5">
           <Link
             to={`review/${data._id}`}
             className='text-center text-white border rounded-4 p-4 bg-main-color'
           >
             Add your Review
           </Link>
         </div>
       );
     }
   }
   return null; 
 })()}

 </div>
 </>
  )
}


