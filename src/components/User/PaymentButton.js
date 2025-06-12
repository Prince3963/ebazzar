import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};




const PaymentButton = () => {
    const [amount, setAmount] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const token = getCookie('token');

    useEffect(() => {
        const storedAmount = localStorage.getItem('cart_total_amount');
        if (storedAmount) {
            setAmount(storedAmount);
        }
    }, []);

    useEffect(() => {
        // Example: fetch username from your API with token
        const fetchUser = async () => {
            try {
                const response = await fetch('https://localhost:7219/api/user/profile', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUsername(userData.username);
                } else {
                    console.log('Failed to fetch user data');
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchUser();
    }, [token]);


    const createOrderFormData = (razorpay_order_id) => {
        const savedAddressJSON = localStorage.getItem('selectedAddress');
        const savedAddress = savedAddressJSON ? JSON.parse(savedAddressJSON) : null;
        const savedAddressId = savedAddress ? savedAddress.address_id : '1';

        const formData = new FormData();
        formData.append('username', username);
        formData.append('address_id', savedAddressId);
        formData.append('razorpay_order_id', razorpay_order_id);
        formData.append('total_price', amount);
        formData.append('status', 'Confirmed');
        formData.append('createdAt', new Date().toISOString());

        return formData;
    };


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
        return data.orderId;
    };

    const handlePayment = async () => {
        try {
            if (!amount || amount <= 0) {
                alert('Invalid amount');
                return;
            }

            const orderId = await createOrderOnServer(); // Backend order ID (optional use)

            const options = {
                key: 'rzp_test_PQ2r2RUKU4ACiT',
                amount: amount * 100,
                currency: 'INR',
                handler: async function (response) {
                    const razorpay_order_id = response.razorpay_payment_id;

                    // ✅ Save order in backend
                    await fetch('https://localhost:7219/api/order/addOrder', {
                        method: 'POST',
                        headers: {
                            Authorization: 'Bearer ' + token,
                        },
                        body: createOrderFormData(razorpay_order_id),
                    });

                    alert('✅ Payment successful & Order placed!');
                    navigate('/order-success'); // ya home
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
                    color: '#4f46e5',
                },
                modal: {
                    ondismiss: function () {
                        alert('⚠️ Payment cancelled by user');
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Payment error:', error);
            alert('⚠️ Payment initialization failed: ' + error.message);
        }
    };


    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-100">

            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
            >
                &larr;
            </button>

            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4"></h2>
                <p className="text-lg text-gray-600">Total Payable Amount:</p>
                <h1 className="text-4xl font-bold text-indigo-700 my-4">₹{amount}</h1>
                <button
                    onClick={handlePayment}
                    className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg hover:bg-blue-600 transition"
                >
                    <div className='m-1'>
                        &nbsp; Pay Now  &nbsp;
                    </div>
                </button>

                <h1>✅ Thank you! Your order has been placed successfully.</h1>
            </div>
        </div>
    );

};

export default PaymentButton;
