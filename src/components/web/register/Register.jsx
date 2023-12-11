import React from 'react'
import './Register.css'
import Input from '../shared/Input.jsx'
import { useFormik } from 'formik'
import axios from 'axios'
import { registerSchema } from '../validate/validate.js'
import { toast } from 'react-toastify'
export default function Register() {

  const  initialValues={
    userName:'',
    email:'',
    password:'',
    image:'',
  }

  const handelFieldChange= (event)=>{
     
    formik.setFieldValue('image',event.target.files[0])
}

  const onSubmit =async users =>{
    const formData=new FormData ();
        formData.append("userName",users.userName);
        formData.append("email",users.email);
        formData.append("password",users.password);
        formData.append("image",users.image);
        const {data}= await axios.post(`${import.meta.env.VITE_API_URL}`,formData)
           
          if (data.message=='success'){
            formik.resetForm();
            toast.success('Account created successfully, Please verify your email to log in', {
              position: "bottom-center",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });}
  }
  const formik=useFormik({
     initialValues,
     onSubmit,
     validationSchema:registerSchema

  })

  const input=[
    {
       id:'name',
       name:'userName',
       type:'text',
       title:'User Name',
       value:formik.values.userName,

    },
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
        id:'image',
        name:'image',
        type:'file',
        title:'User Image',
       onChange:handelFieldChange

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
  onChange={ ele.onChange || formik.handleChange} 
  errors={formik.errors}
  onBlur={formik.handleBlur}
  touched={formik.touched} 
   />

  )

  
  return (
    <div className='container my-5'>
      <h2 className='text-center'>Create Acount</h2>

 <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
    {renderInputs}
    <div className="d-flex justify-content-center">
    <button type="submit" className="submitIcone rounded-3 px-4 py-2" disabled={!formik.isValid}>Submit</button>
    </div>
   
</form>

    </div>
  )
}
