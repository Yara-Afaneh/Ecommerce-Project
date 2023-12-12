import React from 'react'
import ReactDOM from 'react-dom/client'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import USerContextProvider from './components/web/context/Usercontext.jsx';
import CartContextProvider from './components/web/context/Cart.jsx';




const queryClient=new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
  <>

  <USerContextProvider>
    <CartContextProvider>
    <QueryClientProvider client={queryClient}>
    <ToastContainer/>
    <App />
    </QueryClientProvider>
    </CartContextProvider>
  </USerContextProvider>
   
  </>,
)
