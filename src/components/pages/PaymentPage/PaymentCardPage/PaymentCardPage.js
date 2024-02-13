import React, { useState, useEffect } from 'react';
import './PaymentCardPage.css'; // Include your CSS file
import AnimateCard from './AnimateCard';

const PaymentCardPage = () => {
  return (
    <div>
        <AnimateCard />
        <h2>PaymentCardPage</h2>
    </div>
  );
};

export default PaymentCardPage;
