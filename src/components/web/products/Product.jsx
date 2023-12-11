import React, {useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from '../loader/Loader.jsx';
import { CartContext } from '../context/Cart.jsx';
import './Product.css'


export default function Product() {
  const navigate= useNavigate();
  const {productId}=useParams();
  const {addToCartContext}=useContext(CartContext)

  const getProductDetails=async ()=>{
    const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/${productId}`)
    return data.product;
  }
  
  const addToCart=async (productId)=>{
        const result = await addToCartContext(productId);
        console.log(result); 
        navigate('/cart');  
  }

   const {data,isLoading}= useQuery('product-details',getProductDetails);
   if (isLoading){
    return <Loader/>
   
   }
  return (
    <div className='container row ms-5'>
       <div className='my-2 text-center col-md-4 '>
        {data.subImages.map((img,index)=>
        <div  key={index}>
            <img src={img.secure_url} alt={'product image'} className='my-3'/>
        </div>
          
        )}
        </div> 
          <div className='col-md-6 m-5' >
              <h2>{data.name}</h2>
              <h2>{data.price}</h2>
              <button onClick={()=>{addToCart(data._id)}} className='addtocart-btn'>Add to cart</button>
          </div>
        
    </div>
  )
}
