import React, { useState } from 'react';

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

const PaymentButton = () => {
    const [amount, setAmount] = useState('');
    const token = getCookie('token');

    // 1. Backend pe order create karne wali API call
    const createOrderOnServer = async () => {
        const response = await fetch('https://localhost:7219/api/payment/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({ amount: Number(amount) }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Order creation failed');
        }

        const data = await response.json();
        return data.orderId;  // Backend se jo orderId mile wo return karo
    };

    // 2. Payment ke baad order create karne wali API call
    // const createOrder = async (paymentResponse) => {
    //     try {
    //         const requestData = {
    //             amount,
    //             paymentId: paymentResponse.razorpay_payment_id,
    //             orderId: paymentResponse.razorpay_order_id,
    //             signature: paymentResponse.razorpay_signature,
    //         };

    //         const response = await fetch('https://localhost:7219/api/payment/create-order', {
    //             method: 'POST',
    //             body: JSON.stringify(requestData),
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: 'Bearer ' + token,
    //             },
    //         });

    //         if (!response.ok) {
    //             const error = await response.json();
    //             throw new Error(error.message || 'Order creation failed');
    //         }

    //         return await response.json();
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    const handlePayment = async () => {
        try {
            if (!amount || amount <= 0) {
                alert('Please enter a valid amount');
                return;
            }

            // Pehle backend se orderId lo (ye order Razorpay ke liye)
            // const orderId = await createOrderOnServer();

            const options = {
                key: 'rzp_test_PQ2r2RUKU4ACiT',
                amount: amount * 100,
                currency: 'INR',
                // order_id: orderId,
                handler: async function (response) {
                    // Payment success hone par create-order API call karenge
                    try {
                        await createOrderOnServer();
                        alert('Payment successful and order created!');
                        // Yahan UI pe payment success dikhana hai toh state set kar sakta hai
                    } catch (err) {
                        alert('Order creation failed: ' + err.message);
                    }
                },
                // User agar cancel kare toh ye chalta hai
                modal: {
                    ondismiss: function () {
                        alert('Payment cancelled by user');
                        // Koi bhi API call na kare
                    },
                },
                prefill: {
                    name: 'Customer Name',
                    email: 'customer@example.com',
                    contact: '1234567890',
                },
                notes: {
                    address: 'Customer Address',
                },
                theme: {
                    color: '#F37254',
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment initialization failed: ' + error.message);
        }
    };

    return (
        <div>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
            />
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default PaymentButton;
