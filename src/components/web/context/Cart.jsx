import axios from "axios";
import { createContext,useState } from "react"
import { toast } from 'react-toastify'

export const CartContext=createContext(null);
export default function CartContextProvider({children}) {

    const [count,setCount]=useState(0);
    const addToCartContext=async (productId)=>{
        try {
          
            const token=localStorage.getItem('userToken');
            const {data}= await axios.post(`https://ecommerce-node4.vercel.app/cart`,
            {productId},
            {headers:{Authorization:`Tariq__${token}`}}
            )
            if(data.message=="success"){
            toast.success('Product added successfuly', {
                position: "bottom-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });}
           
            return data;
           
        } catch (error) {
            console.log(error);
        }

    }

    const getCartContext=async ()=>{
      try {
        const token= localStorage.getItem('userToken')
        const {data}= await axios.get(`https://ecommerce-node4.vercel.app/cart`,
        {headers:{Authorization:`Tariq__${token}`}})
        setCount(data.count)
        return data;
      } catch (error) {
        console.log(error);
      }
     
    }

    const removeCartContext=async (productId)=>{
      try {
        const token= localStorage.getItem('userToken')
        const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,
        {productId},
        {headers:{Authorization:`Tariq__${token}`}})
        return data;
        
      } catch (error) {
        console.log(error);
      }
     
    }


  return <CartContext.Provider value={{addToCartContext,getCartContext,removeCartContext,count,setCount}}>
    {children}
  </CartContext.Provider>
}


