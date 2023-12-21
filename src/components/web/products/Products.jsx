import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from '../loader/Loader.jsx';
import { Link, useNavigate, useParams } from 'react-router-dom';
import shopping from './../img/shopping.png'
import { CartContext } from '../context/Cart.jsx';
import Rating from './Rating.jsx';

export default function Products() {

  const navigate= useNavigate();
  const {addToCartContext}=useContext(CartContext)


  const [currentPage, setCurrentPage] = useState(1);
    const getProducts =async (pageNumber) => {
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${pageNumber}`);
        console.log(data);
        return (data);
      }
      const { data, isLoading } = useQuery(['products', currentPage],() => getProducts(currentPage), {
        keepPreviousData: true,
      });

      const addToCart=async (productId)=>{
        const result = await addToCartContext(productId);
        navigate('/cart');  
  }

 
 
      const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

      if (isLoading) {
        return <Loader/>;
      }

  return (
    <div className="container ">


      <div className="row">
        {data?.products.length ? (
          data.products.map((products) => (
          
            <Link to={`category/${products.categoryId}/product/${products._id}`} className="col-md-3" key={products._id}>
              <div className="card" style={{ width: "15rem" }}>
                <div className="my-3 text-center">
                  <img
                    src={products.mainImage.secure_url}
                    className="w-75 image-fluid"
                  />
                  <div className="card-body">
                    <p className="card-text">{products.name}</p>
                    <p className="card-text"><Rating value={products.avgRating}/></p>
                  </div>
                  <div className="addToCart">
                  <h5 className="card-title">{products.finalPrice} $</h5>
                  <button onClick={() => {addToCart(products._id)}}><img src={shopping} className='img-fluid'/></button>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <h2 className="text-center main-color">No Products Found</h2>
        )}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination my-5 d-flex justify-content-center">
        {Array.from({ length: Math.ceil(data.total / data.page) }, (_, index) => (
      <li className="page-item" key={index}>
        <button className="page-link text-black p-3" onClick={() => handlePageClick(index + 1)}>
          {index + 1}
        </button>
      </li>
    ))}
        </ul>
      </nav>
    </div>
  );
}
