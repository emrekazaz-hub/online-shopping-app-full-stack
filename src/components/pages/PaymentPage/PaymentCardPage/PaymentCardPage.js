import React, { useEffect, useState } from 'react';
import './PaymentCardPage.css';
import { useCart } from '../../../CartContext/CartContext';
import Pagination from '../Pagination/Pagination';

const PaymentCardPage = () => {

  const { cartItems, handleStepChange, handleNavigate, fetchCardInformation } = useCart();


  const handleApproveClick = () => {
    handleStepChange(1);
    handleNavigate('/paginationCard');
  }

  const handleBackClick = () => {
    handleStepChange(-1);
    handleNavigate('/shoppingcart');
  }

  /*
  useEffect(()=> {
    fetchCardInformation();
  },[])
  */  

  return (
    <div className='main-div-payment'>
      <h2>PaymentCardPage</h2>
      <div>
        <Pagination />
      </div>

      <div className='payment-items-view-div'>
        {
          cartItems.map((product, index) => (

            <div key={index} className='horizontal-card'>

              <div className='card-body-image-details'>
                <img className='image-card' src={product.image_url} ></img>
                <div className='h2-desc-price'>
                  <h2>{product.productname}</h2>
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                </div>
              </div>

              <div className='p-tag-payment'>
                <p>qyt : {product.quantity}</p>
              </div>

            </div>
          ))
        }

        <div className='butn-group-payment'>
          <button className='btn btn-success' onClick={handleApproveClick}>Approve Items</button>
          <button className='btn btn-dark' onClick={handleBackClick}>Go Back</button>
        </div>

      </div>


    </div>
  );
};

export default PaymentCardPage;
