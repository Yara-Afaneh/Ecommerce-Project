import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/Cart.jsx'
import './Cart.css'
import { Link } from 'react-router-dom';


export default function Cart() {
  const {getCartContext,removeCartContext,clearAllProducts,increaseQuantity,decreaseQuantity}=useContext(CartContext)
  const [cart,setCart]=useState([]);

 
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleRadioChange = (event) => {
      setSelectedOption(event.target.value);
    };


    const [total, setTotal] = useState(0);
  

  const getCart= async () =>{
      const res = await getCartContext();
    setCart(res);
  }

  useEffect(()=>{
    getCart()
  },[cart])


  const clearAll =async () =>{
    const res = await clearAllProducts();
   
    return res;
  }

  
  const increase =async (productId) =>{
    const res = await increaseQuantity(productId);
   
    return res;
  }

  const decrease =async (productId) =>{
    const res = await decreaseQuantity(productId);
       console.log(res)
    return res;
  }
  const removeCart=async (productId)=>{
    const result = await removeCartContext(productId);
    return result; 
}
  useEffect(() => {
      if (cart && cart.products) {
      const newTotal = cart.products.reduce((acc, product) => acc + product.quantity * product.details.price, 0);
      setTotal(newTotal);
    } else {
      setTotal(0);
    }
  }, [cart]);

  return (
    <div className="cart">
      <div className="container">
        <div className="cart-items row ">
          <div className="products col-md-6">
            <table className="table table-striped table-bordered my-5">
              <thead>
                <tr>
                  <th scope="col">Product Info</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Subtotal</th>
                </tr>
              </thead>
              {cart && cart.products && cart.products.length > 0 ? (
                cart.products.map((product) => (
                  <tbody>
                    <tr>
                      <th scope="row">
                        <div className="d-flex">
                          <img
                            src={product.details.mainImage.secure_url}
                            className="img-fluid w-25"
                          />
                          <div className="px-2">
                            <p>{product.details.name}</p>
                            <button
                              onClick={() => removeCart(product.productId)}
                              className="addtocart-btn"
                            >
                              remove item
                            </button>
                          </div>
                        </div>
                      </th>
                      <td>
                        <div className="quantity d-flex align-items-center">
                          <button onClick={() => decrease(product.productId)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={17}
                              viewBox="0 0 16 17"
                              fill="none"
                            >
                              <path
                                d="M3.22852 8.5H12.5618"
                                stroke="#121212"
                                strokeWidth="0.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <span className="m-2">{product.quantity}</span>
                          <button onClick={() => increase(product.productId)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={17}
                              viewBox="0 0 16 17"
                              fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8.37565 3.83333C8.37565 3.62622 8.20776 3.45833 8.00065 3.45833C7.79354 3.45833 7.62565 3.62622 7.62565 3.83333V8.125H3.33398C3.12688 8.125 2.95898 8.29289 2.95898 8.5C2.95898 8.7071 3.12688 8.875 3.33398 8.875H7.62565V13.1667C7.62565 13.3738 7.79354 13.5417 8.00065 13.5417C8.20776 13.5417 8.37565 13.3738 8.37565 13.1667V8.875H12.6673C12.8744 8.875 13.0423 8.7071 13.0423 8.5C13.0423 8.29289 12.8744 8.125 12.6673 8.125H8.37565V3.83333Z"
                                fill="#121212"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4">{product.details.price}</td>
                      <td className="py-3 px-4">
                        ${product.quantity * product.details.price}
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <h2 className="text-center main-color">Your Cart is Empty</h2>
              )}
            </table>
            {cart && cart.products && cart.products.length > 0 ? (
              <div className="d-flex justify-content-center">
                <button onClick={clearAll} className="clear-btn">
                  Clear All{" "}
                </button>
              </div>
            ) : null}
          </div>

          <div className="cartsummary px-3 col-md-6 my-5">
            <h2 className="text-center">Cart summary</h2>

            <div className="summary-items">
              <div className="form-check summary-item py-2 ps-5 pe-2">
                <div className="">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value={'0'}
                  checked={selectedOption === '0'}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                Free shipping
                </label>
                </div>
               
                <div className="">
                <span>$0.00</span>
                </div>
                
              </div>

              <div className="form-check summary-item py-2 ps-5 pe-2">
                <div className="">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value={'15'}
                  checked={selectedOption === '15'}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                Express shipping
                </label>
                </div>
               
                <div className="">
                <span>+$15.00</span>
                </div>
                
              </div>

              <div className="form-check summary-item py-2 ps-5 pe-2">
                <div className="">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value={'21'}
                  checked={selectedOption === '21'}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                Pick Up
                </label>
                </div>
               
                <div className="">
                <span>+$21.00</span>
                </div>
                
              </div>

              <div className="summary-footer">
                <label>Subtotal</label>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-footer">
                <label className="total">Total</label>
                <span>{(total + parseFloat(selectedOption)).toFixed(2)}</span>
              </div>
              {cart && cart.products && cart.products.length > 0 ? (
                <div className="d-flex justify-content-center">
                  <button className="checkout bg-main-color border-0 p-2 rounded mt-5">
                    <Link to={"/order"}>Chekout</Link>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
