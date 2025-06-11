import React from 'react';
import PaymentButton from './PaymentButton';

const OrderPage = ({ orderId, amount }) => (
    <div>
        <h2>Order #{orderId}</h2>
        <p>Total Amount: ₹{amount}</p>
        <PaymentButton orderId={orderId} amount={amount} />
    </div>
);

export default OrderPage;