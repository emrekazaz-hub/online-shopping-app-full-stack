import React from "react";
import { useCart } from "../../../CartContext/CartContext";
import '../PaymentCardPage/PaymentCardPage.css';

const Pagination = () => {

    const { step } = useCart();

    return (
        <div>
            <div className='pagination'>
                <i className={`bi bi-bag pagination-group-item ${step === 0 ? 'current-step-color' : ''} ${step >= 0 ? 'change-color' : ''}`}></i>
                <i className={`bi bi-arrow-right pagination-arrow`}></i>
                <i className={`bi bi-credit-card-fill pagination-group-item ${step === 1 ? 'current-step-color' : ''} ${step >= 1 ? 'change-color' : ''}`}></i>
                <i className={`bi bi-arrow-right pagination-arrow`}></i>
                <i className={`bi bi-geo-fill pagination-group-item ${step === 2 ? 'current-step-color' : ''} ${step >= 2 ? 'change-color' : ''}`}></i>
                <i className={`bi bi-arrow-right pagination-arrow`}></i>
                <i className={`bi bi-check-circle pagination-group-item ${step === 3 ? 'change-color' : ''}`}></i>
                <i className={`bi bi-arrow-right pagination-arrow`}></i>
                <i className={`bi bi-truck pagination-group-item ${step === 3 ? 'cargo-color' : ''} ${step >= 3 ? 'change-color' : ''}`}></i>
            </div>
        </div>
    );
}

export default Pagination;