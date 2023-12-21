import React, { useState } from 'react'
import { useFormik } from 'formik';
import Input from '../shared/Input.jsx';
import { reveiwSchema } from '../validate/validate.js'

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Review() {

  
  let[errorBack,setErrorBack]=useState('');

  const navigate=useNavigate()

  const {productId}=useParams();

    const  initialValues={
        comment:'',
        rating:'',
      }

    const onSubmit = async review => {
        try {
          const token= localStorage.getItem('userToken')
          const data = await axios.post(`${import.meta.env.VITE_API_URL}/products/${productId}/review`,review,
          {headers:{Authorization:`Tariq__${token}`}});
          if (data.message === 'success') {
            toast.success('ٌReview Send successfully', {
              position: "bottom-center",
              autoClose: true,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
              console.log(data.data)
              navigate('/products/category/:categoryId/product/:productId')
            
          }
        } catch (error) {
          setErrorBack(error.response.data.message);
        }
      }
      const formik=useFormik({
        initialValues,
        onSubmit,
        validationSchema:reveiwSchema
    
     })
      const input=[
        {
            id:'comment',
            name:'comment',
            type:'comment',
            title:'Leave A comment',
            value:formik.values.comment,
     
         },
         {
            id:'rating',
            name:'rating',
            type:'rating',
            title:'Rating ',
            value:formik.values.rating,
     
         }
        ]
   
      const reviews = input.map((ele,index)=>    
      <Input 
      type={ele.type} 
      id={ele.id} 
      name={ele.name} 
      title={ele.title} 
      key={index} 
      value={ele.value}
      onChange={formik.handleChange} 
      errors={formik.errors}
      onBlur={formik.handleBlur}
      touched={formik.touched} 
       />)

  return (
    
<div className="">
     <h2 className='text-center'>Send Review</h2>
     {errorBack && <p className='text-danger text-center'>{errorBack}</p>}
<form onSubmit={formik.handleSubmit}>
   {reviews}
   <div className="d-flex justify-content-center">
   <button type="submit" className="submitIcone rounded-3 px-4 py-2" disabled={!formik.isValid}>Send Review</button>
   </div>
</form>
     </div>
   
  )
}
