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
                }
            } catch (err) {
                console.error(err);
            }
        };

        if (token) {
            fetchUser();
        }
    }, [token]);

    const createOrderFormData = (razorpay_order_id) => {
        const savedAddressJSON = localStorage.getItem('selectedAddress');
        const savedAddress = savedAddressJSON ? JSON.parse(savedAddressJSON) : {};
        const formData = new FormData();
        formData.append('username', username);
        formData.append('address_id', savedAddress.address_id || '1');
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
        return data.data; // razorpay_order_id
    };

    const handlePayment = async () => {
        try {
            if (!amount || amount <= 0) {
                alert('Invalid amount');
                return;
            }

            const orderId = await createOrderOnServer(); // create Razorpay order

            const options = {
                key: 'rzp_test_PQ2r2RUKU4ACiT',
                amount: amount * 100,
                name: 'eBazzar',
                description: 'Payment to eBazzar',
                currency: 'INR',
                order_id: orderId,
                handler: async function (response) {
                    try {
                        // Get selected address
                        const savedAddressJSON = localStorage.getItem('selectedAddress');
                        const addressObj = savedAddressJSON ? JSON.parse(savedAddressJSON) : {};

                        // 1. Add Order to backend
                        const addOrderResponse = await fetch('https://localhost:7219/api/order/addOrder', {
                            method: 'POST',
                            headers: {
                                Authorization: 'Bearer ' + token,
                            },
                            body: createOrderFormData(response.razorpay_order_id),
                        });

                        if (!addOrderResponse.ok) throw new Error('Failed to add order');
                        const orderResult = await addOrderResponse.json();

                        const createdOrderId = orderResult.data; // Make sure backend returns actual order_id
                        if (!createdOrderId) throw new Error("No order_id returned");

                        // 2. Add OrderDetails
                        const cart = JSON.parse(localStorage.getItem('guest_cart') || '[]');

                        for (const item of cart) {
                            const orderDetailsDTO = {
                                product_id: item.productId,
                                order_id: createdOrderId,
                                quantity: item.quantity,
                                final_price: item.product_price * item.quantity,
                                product_name: item.product_name,
                                product_image: item.product_imageURL,
                                razorpay_order_id: response.razorpay_order_id,
                            };

                            console.log("Sending order detail:", orderDetailsDTO);
                            // alert("Sending order detail:", orderDetailsDTO);

                            const detailResponse = await fetch('https://localhost:7219/api/test/addOrderDetails', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: 'Bearer ' + token,
                                },
                                body: JSON.stringify(orderDetailsDTO),
                            });

                            if (!detailResponse.ok) {
                                let errorMsg = "Unknown error";
                                try {
                                    const errJson = await detailResponse.json();
                                    errorMsg = errJson.message || JSON.stringify(errJson);
                                } catch {
                                    errorMsg = await detailResponse.text(); // fallback to plain text error if JSON parsing fails
                                }
                                console.warn("Failed to add order detail:", errorMsg);
                            }

                        }

                        // 3. Clean up
                        localStorage.removeItem('cart');
                        localStorage.removeItem('cart_total_amount');
                        localStorage.removeItem('selectedAddress');

                        // alert('Payment successful & Order placed!');
                        navigate('/successPage');

                    } catch (err) {
                        console.error("Payment handler error:", err);
                        alert("Something went wrong while processing order: " + err.message);
                    }
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
                        navigate('/failPayment');
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            navigate('/failPayment');
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
                <p className="text-lg text-gray-600">Total Payable Amount:</p>
                <h1 className="text-4xl font-bold text-indigo-700 my-4">₹{amount}</h1>
                <button
                    onClick={handlePayment}
                    className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg hover:bg-blue-600 transition"
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default PaymentButton;
