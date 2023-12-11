import React from 'react'
import Input from '../shared/Input.jsx'
import { useFormik } from 'formik'
import axios from 'axios'
import {newpasswordSchema } from '../validate/validate.js'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function ForgetPassword() {

 

  const navigate=useNavigate();

  

  const  initialValues={
    email:'',
    password:'',
    code:'',
  }

  const onSubmit =async users =>{
      const {data}= await axios.patch(`https://ecommerce-node4.vercel.app/auth/forgotPassword`,users)
      console.log(data);

      if (data.message=='success'){
           
        localStorage.setItem('userToken',data.token);
        toast.success('PasswordChanged successfully', {
          position: "bottom-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });}
          navigate('/login');
}

  
 
  const formik=useFormik({
     initialValues,
     onSubmit,
     validationSchema:newpasswordSchema

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

     },
     {
        id:'code',
        name:'code',
        type:'password',
        title:'Code',
        value:formik.values.code,

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
      <h2 className='text-center'>Reset Password</h2>

 <form onSubmit={formik.handleSubmit}>
    {renderInputs}
    <div className="d-flex justify-content-center">
    <button type="submit" className="submitIcone rounded-3 px-4 py-2" disabled={!formik.isValid}>Reset Password</button>
    </div>
</form>


    </div>
  )
}