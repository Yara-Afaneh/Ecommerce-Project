import React, { useContext, useEffect} from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from './components/web/home/Home.jsx'
import Layout from './layouts/Layout';
import Register from './components/web/register/Register';
import Login from './components/web/login/Login';
import Categories from './components/web/categories/Categories.jsx';
import DashedLayout from './layouts/DashedLayout.jsx';
import HomeDashed from './components/dashboared/home/Home.jsx';
import CategoriesDashed from './components/dashboared/categories/Categories.jsx';
import Products from './components/web/products/Product.jsx';
import CategoriesDetails from './components/web/categories/CategoriesDetails.jsx';
import Product from './components/web/products/Product.jsx';
import  { UserContext } from './components/web/context/Usercontext.jsx';
import Cart from './components/web/cart/Cart.jsx';
import SendCode from './components/web/login/SendCode.jsx';
import ForgetPassword from './components/web/login/ForgetPassword.jsx';
import ProtectedRoutes from './components/web/protectedRoutes/ProtectedRoutes.jsx';
import Profile from './components/web/profile/Profile.jsx';
import Auth from './components/web/protectedRoutes/Auth.jsx';
import { CartContext } from './components/web/context/Cart.jsx';
import Order from './components/web/cart/Order.jsx';
import UserInfo from './components/web/profile/UserInfo.jsx';
import UserContact from './components/web/profile/UserContact.jsx';
import UserOrder from './components/web/profile/UserOrder.jsx';



export default function App() {

let {setUserToken}= useContext(UserContext)
let {setCount,getCartContext}=useContext(CartContext);
useEffect(()=>{
  if (localStorage.getItem('userToken')!=null){
    setUserToken(localStorage.getItem('userToken'));
    setCount(getCartContext().count);
  }
},[])


const router= createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,

    children:[{
      path:'register',
      element:<Register/>
    },
    {
      path:'login',
      element:
       <Auth>
        <Login/>
        </Auth>
    },
    {
      path:'/',
      element:
       <Home/>
       
    },
    {
      path:'categories',
      element:<Categories/>
    },{
      path:'product',
      element:<Products/>
    },
    {
      path:'products/category/:categoryId',
      element:<CategoriesDetails/>
    },
    {
      path:'products/category/:categoryId/product/:productId',
      element:<Product/>
    },
    {
      path:'cart',
      element:
      <ProtectedRoutes>
           <Cart/> 
      </ProtectedRoutes>
     
    },
    {
      path:'sendcode',
      element:<SendCode/>
    },
    {
      path:'forgetpassword',
      element:<ForgetPassword/>
    },
    {
      path:'profile',
      element:
      <ProtectedRoutes>
      <Profile/>
      </ProtectedRoutes>
      ,
         children:[{
          path:'info',
          element:<UserInfo/>
         },{
          path:'contact',
          element:<UserContact/>
         }
         ,{
          path:'order',
          element:<UserOrder/>
         }

         ]
    },
    
    {
      path:'*',
      element:<h2>Page not found</h2>
    },
    {
      path:'home',
      element:<Home/>
    },
    {
      path:'order',
      element:<Order/>
    }
    ]
  },

  {
    path:'/dashed',
    element:<DashedLayout/>,

    children:[{
      path:'home',
      element:<HomeDashed/>
    },
    {
      path:'categories',
      element:<CategoriesDashed/>
    },
    {
      path:'*',
      element:<h2>Page not found</h2>
    }
    ]
  }
])

  return (
    
    
      <RouterProvider router={router} />
   
   
  )
}
