import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/Cart.jsx';

export default function UserOrder() {
    const {getOrderContext}=useContext(CartContext)
    const [order,setOrder]=useState([]);
    const getOrder= async () =>{
        const data = await getOrderContext();
      setOrder (data.orders);
    }
  
    useEffect(()=>{
      getOrder()
    },[order])

  return (
    <>
         <>
      {order?.length ? (
        order.map((ele,index) => (
            <div key={ele.userId}>

<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Address</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Final Price </th>
      <th scope="col">Payment Type </th>
      <th scope="col">Order Status </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"></th>
      <td>{ele.address}</td>
      <td>{ele.phoneNumber}</td>
      <td>{ele.finalPrice}</td>
      <td>{ele.paymentType}</td>
      <td>{ele.status}</td>
    </tr>
  </tbody>
</table>
</div>
          
        ))
      ) : (
        <p>No orders available.</p>
      )}
    </>
    </>
  )
}
