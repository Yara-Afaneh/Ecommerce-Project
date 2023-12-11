import React, { useContext, useState } from 'react'
import Input from '../shared/Input.jsx'
import { useFormik } from 'formik'
import axios from 'axios'
import { loginSchema } from '../validate/validate.js'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/Usercontext.jsx'


export default function Login() {

 
let {setUserToken,userToken}=useContext(UserContext)
  
  const navigate=useNavigate();
    
  

  const  initialValues={
    email:'',
    password:'',
  }

  const onSubmit =async users =>{
      const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,users)
   

      if (data.message=='success'){
           
        localStorage.setItem('userToken',data.token);
        setUserToken(data.token);
          
        toast.success('Login successfully', {
          position: "bottom-center",
          autoClose: true,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });}
          navigate('/home');
}

  
 
  const formik=useFormik({
     initialValues,
     onSubmit,
     validationSchema:loginSchema

  })

  const input=[
    {
        id:'email',
        name:'email',
        type:'email',
        title:'User Email',
        value:formik.values.email,

     },
     {
        id:'password',
        name:'password',
        type:'password',
        title:'User Password',
        value:formik.values.password,

     }

    ]




  const renderInputs = input.map((ele,index)=>
        
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
   />

  )

  
  return (
    <div className='container my-5'>
      <h2 className='text-center'>Log in</h2>

 <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
    {renderInputs}
    <div className="d-flex justify-content-center">
    <button type="submit" className="submitIcone rounded-3 px-4 py-2" disabled={!formik.isValid}>Login</button>
    </div>
</form>
<Link to={'/sendcode'} className='text-center'>Forget Passwod?</Link>

    </div>
  )
}
