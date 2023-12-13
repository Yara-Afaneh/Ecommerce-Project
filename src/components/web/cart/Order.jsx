import React, { useContext } from 'react'
import Input from '../shared/Input.jsx'
import { useFormik } from 'formik'
import axios from 'axios'
import { orderSchema } from '../validate/validate.js'
import { toast } from 'react-toastify'
import { UserContext } from '../context/Usercontext.jsx'
import { useNavigate } from 'react-router-dom'






export default function Order() {

    let {setUserToken}=useContext(UserContext)
    const navigate=useNavigate();
  
  const  initialValues={
    phone:'',
    address:'',
    couponName:'',
  }

  const onSubmit =async order =>{
    try {
        const token=localStorage.getItem('userToken');
        const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/order`,
        order
          ,{headers:{authorization:`Tariq__${token}`}})

      if (data.message=='success'){
         localStorage.setItem('userToken',data.token);
        setUserToken(data.token);
      toast.success('Order sended successfully', {
        position: "bottom-center",
        autoClose: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })};
        console.log(data);
        navigate('')


    } catch (error) {
        console.log(error); 
    }}
 
 
  const formik=useFormik({
     initialValues,
     onSubmit,
     validationSchema:orderSchema

  })

  const input=[
    {
        id:'phone',
        name:'phone',
        type:'string',
        title:'Mobile Number',
        value:formik.values.phone,

     },
     {
        id:'address',
        name:'address',
        type:'string',
        title:'User Address',
        value:formik.values.address,

     },
     {
      id:'couponName',
      name:'couponName',
      type:'string',
      title:'Have a coupon ?  Add your code for an instant cart discount',
      value:formik.values.couponName,
   

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
<div className='row'>
<div className='container my-5 '>
      <h2 className='text-center'>Send Your Order </h2>

 <form onSubmit={formik.handleSubmit} >
    {renderInputs}
    <div className="d-flex justify-content-center my-5">
    <button type="submit" className="submitIcone rounded-3 px-4 py-2" disabled={!formik.isValid}>Order Now</button>
    </div>
      </form>
    </div>

</div>
   
  )
}
