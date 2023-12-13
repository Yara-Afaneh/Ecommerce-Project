import React, { useContext } from 'react'
import logo from './../img/logo.jpeg'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/Usercontext.jsx';
import { CartContext } from '../context/Cart.jsx';


export default function Navbar() {

  let {userToken,setUserData,setUserToken,userData}=useContext(UserContext);
  let {count}=useContext(CartContext);
  
  console.log("counttttttttttttttttttttt")
  console.log(count)
 

  const navigate=useNavigate();


  const logout=()=>{
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserData(null);
    navigate('/');
  }
  return (
    <>
<nav className="navbar navbar-expand-lg py-0">
  <div className="container">
    <a className="navbar-brand" href="#"><img src={logo} className='img-fluid'/></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav m-auto mb-2 mb-lg-0">
        <li className="nav-item mx-3">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item mx-3">
        <Link className="nav-link " to="/categories">Categories</Link>       
         </li>
        <li className="nav-item mx-3">
        <Link className="nav-link"  to="/product">Products</Link>
      </li>

      {userToken? (<li className="nav-item mx-3">
      <Link className="nav-link"  to="/cart">Cart <span className="badge">{count}</span></Link>
      </li>):null}
      

     
      </ul>
      <ul className="navbar-nav">
    <li className="nav-item dropdown">
  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    {userData!=null?userData.userName:"Account"}
  </a>
  {userToken==null ? (
     <>
     <ul className="dropdown-menu">
     <li><Link className="dropdown-item" to="/register">Register</Link></li>
     <li><Link className="dropdown-item" to='/login'>Login</Link></li>
   </ul>
   </>
  )
 :(  <>
  <ul className="dropdown-menu">
   <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
   <li><Link className="dropdown-item" to='/login' onClick={logout}>LogOut</Link></li>
 </ul>
 </>)
 
  }
 
</li>

        </ul>
     
    </div>
  </div>
</nav>

    </>
  )
}
