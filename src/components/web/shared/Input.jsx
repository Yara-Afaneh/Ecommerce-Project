import React from 'react'

export default function Input({title,type,name,value,onChange,id,errors,onBlur,touched}) {
  return (
    <div className='d-flex justify-content-center'>

   <div className='col-6'>
       <label htmlFor='id' className='my-2 text-center'>{title}</label>
      <div className="mb-3 d-flex justify-content-center">
        <input type={type} name={name} id={id} className='form-control' value={value} onChange={onChange} onBlur={onBlur}/>
        {touched[name] && errors[name]&&<p>{errors[name]}</p>}
    </div>
    </div>
    </div>
  )
}
