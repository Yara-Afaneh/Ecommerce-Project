import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loader from '../loader/Loader.jsx';
import { Link } from 'react-router-dom';
import './Categories.css';

export default function CategoriesDetails() {

  const {categoryId} =useParams();


 const getCategoriesDetails= async ()=>{
    const {data}=await axios.get(`https://ecommerce-node4.vercel.app/products/category/${categoryId}`)
    return data.products;

   }

   const {data,isLoading}= useQuery('category-details',getCategoriesDetails);

   if (isLoading){
    return <Loader/>
   
   }



  
  return (
    <div className='container'>
      <div className="row">
    {data?.length? data.map((products)=>
    <Link to={`product/${products._id}`} className='col-md-4'  key={products._id}>
   <div className="card" style={{width: '18rem'}}>
    <div className='my-3 text-center'>
        <img src={products.mainImage.secure_url} className='w-75 image-fluid'/>
        <div className="card-body">
           <h5 className="card-title">{products.price} $</h5>
           <p className="card-text">{products.name}</p>
           
        </div>
    </div>
    </div>
  
   </Link>
   
   ):<h2 className='text-center main-color'>No Products Found</h2>} 
   </div>
    </div>
  )
}
