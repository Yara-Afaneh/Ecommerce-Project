import axios from "axios";
import { createContext,useState } from "react"
import { toast } from 'react-toastify'

export const CartContext=createContext(null);
export default function CartContextProvider({children}) {

    const [count,setCount]=useState(0);
    const [increaseCount, setIncreaseCount] = useState(0);
    const [decreaseCount, setDecreaseCount] = useState(0);
    

    
   
    const addToCartContext=async (productId)=>{
        try {
          
            const token=localStorage.getItem('userToken');
            const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/cart`,
            {productId},
            {headers:{Authorization:`Tariq__${token}`}}
            )
            if(data.message=="success"){
            toast.success('Product added successfuly', {
                position: "bottom-center",
                autoClose: true,
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
        const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
        {headers:{Authorization:`Tariq__${token}`}})
        setCount(data.count)
        return data;
      } catch (error) {
        console.log(error);
      }
     
    }

    const getOrderContext=async ()=>{
      try {
        const token= localStorage.getItem('userToken')
        const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/order`,
        {headers:{Authorization:`Tariq__${token}`}})
        return (data);
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

    const clearAllProducts=async ()=>{
      try {
        const token= localStorage.getItem('userToken')
        const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,
        {},
        {headers:{Authorization:`Tariq__${token}`}})
        if (data.message=='success'){
          toast.success('Cart is Clear ', {
            position: "bottom-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });}
            return (data);
      } catch (error) {
        console.log(error);
      }

    }

    const increaseQuantity=async (productId)=>{
      try {
        const token= localStorage.getItem('userToken')
        const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
        {productId},
        {headers:{Authorization:`Tariq__${token}`}})
        setIncreaseCount((prevCount) => prevCount + 1);
            return (data);
      } catch (error) {
        console.log(error);
      }

    }
    const decreaseQuantity=async (productId)=>{
      try {
        const token= localStorage.getItem('userToken')
        const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
        {productId},
        {headers:{Authorization:`Tariq__${token}`}})
        setDecreaseCount((prevCount) => prevCount + 1);
            
        return (data);
      } catch (error) {
        console.log(error);
      }

    }


  return <CartContext.Provider value={{addToCartContext,increaseCount,decreaseCount,getCartContext,removeCartContext,decreaseQuantity,getOrderContext,count,setCount,increaseQuantity,clearAllProducts}}>
    {children}
  </CartContext.Provider>
}


