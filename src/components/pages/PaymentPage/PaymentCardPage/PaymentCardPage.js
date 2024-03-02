import React, { useState } from 'react';
import './PaymentCardPage.css';
import { useCart } from '../../../CartContext/CartContext';
import Pagination from '../Pagination/Pagination';

const PaymentCardPage = () => {

  const { cartItems, handleStepChange, handleNavigate } = useCart();

  const handleApproveClick = () => {
    handleStepChange(1);
    handleNavigate('/paginationCard');
  }

  return (
    <div className='main-div-payment'>
      <h2>PaymentCardPage</h2>
      <div>
        <Pagination />
      </div>


      <div className='products'>
        {
          cartItems.map((product) => (
            <div key={product.productid} className="card">
              <div className="card-img-top">
                <img src={product.image_url} className="card-img-top" alt="..."></img>
              </div>

              <div className="card-body">
                <h5>{product.productname}</h5>

                <div className="details">
                  <p className="card-tex">{product.description}</p>
                </div>

                <div className="price">
                  <h4>price: {product.price}</h4>
                </div>

                <div>
                  <p>quantity : {product.quantity}</p>
                </div>

              </div>

            </div>
          ))
        }

        <button className='btn btn-dark' onClick={handleApproveClick}>Approve Items</button>

      </div>
    </div>
  );
};

export default PaymentCardPage;
