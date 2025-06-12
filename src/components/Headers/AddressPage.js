import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddressPage() {
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();

    const toggleVisible = () => {
        setIsVisible(!isVisible);
    };

    const [form, setForm] = useState({
        number: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        landmark: "",
        country: "",
        isDefault: "True",
        username: "",
        mobile: "",
    });

    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = getCookie("token");
            const payload = { ...form }; // Include it in payload

            const res = await axios.post(
                "https://localhost:7219/api/Address/user_id",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.data.status) {
                // alert("Address Saved!");
                setForm({
                    number: "",
                    street: "",
                    city: "",
                    state: "",
                    zipCode: "",
                    landmark: "",
                    country: "",
                    isDefault: "false",
                    username: "",
                    mobile: "",
                });
            }
            await fetchAddresses();
        } catch (err) {
            console.error("Error saving address:", err);
        }
    };

    const fetchAddresses = async () => {
        try {
            const token = getCookie("token");
            const res = await axios.get(
                "https://localhost:7219/api/Address/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.status) {
                setAddresses(res.data.data);
            }
        } catch (err) {
            console.error("Error fetching addresses:", err);
        }
    };

    const checkOutHandler = () => {
        const token = getCookie("token");
        // localStorage.setItem("cart_total_amount", totalAmount.toFixed(2)); 

        // ❗ Check if user has selected any address
        if (!selectedAddressId) {
            toast.error("❗ Please select an address before proceeding.");
            return;
        }

        const selectedAddress = addresses.find(addr => addr.address_id === selectedAddressId);

        if (selectedAddress) {
            localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
            console.log("Address saved to localStorage:", selectedAddress);
        }

        if (token) {
            navigate('/payment');
        } else {
            toast("Please login and access it");
            navigate('/login');
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);



    return (
        <div className="p-8 bg-gray-50 min-h-screen relative">

            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
            >
                &larr;
            </button>

            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
            >
                &larr;
            </button>

            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Select or Add Address</h2>

            {/* Flex container to hold Select and Add sections side by side */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Select Address (Left Side) */}
                <div className="md:w-1/2 ">
                    <h3 className="text-xl font-semibold mb-4">Add New Address</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                        {/* <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Receiver Full Name" required className="p-2 border rounded" />
                        <input type="text" name="mobile" value={form.mobile} onChange={handleChange} placeholder="Receiver Mobile Number" required className="p-2 border rounded" /> */}
                        <input type="text" name="number" value={form.number} onChange={handleChange} placeholder="House/Flat No." required className="p-2 border rounded" />
                        <input type="text" name="street" value={form.street} onChange={handleChange} placeholder="Street" className="p-2 border rounded" />
                        <input type="text" name="landmark" value={form.landmark} onChange={handleChange} placeholder="Landmark" className="p-2 border rounded" />
                        <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="City" required className="p-2 border rounded" />
                        <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="State" required className="p-2 border rounded" />
                        <input type="text" name="zipCode" value={form.zipCode} onChange={handleChange} placeholder="Zipcode" required className="p-2 border rounded" />
                        <input type="text" name="country" value={form.country} onChange={handleChange} placeholder="Country" className="p-2 border rounded" />

                        <button type="submit" className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
                            Save Address
                        </button>
                    </form>
                </div>
                {/* Add Address (Right Si
                de) */}
                <div className="md:w-1/2">
                    <h3 className="text-xl font-semibold mb-3">Your Saved Addresses</h3>
                    <ul className="space-y-4">
                        {[...addresses].reverse().map((addr) => (
                            <li key={addr.address_id} className="bg-white p-4 shadow rounded flex gap-4">
                                <input
                                    type="radio"
                                    name="selectedAddress"
                                    checked={selectedAddressId === addr.address_id}
                                    onChange={() => setSelectedAddressId(addr.address_id)}

                                />
                                <div>
                                    <div>{addr.number}, {addr.street}, {addr.city}, {addr.state}, {addr.zipCode}, {addr.country}</div>
                                    <div>{addr.landmark}, {addr.username}, {addr.mobile}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            {/* Checkout Button */}
            <div className="flex justify-end mt-6">
                <button
                    onClick={checkOutHandler}
                    className="p-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                    Process to Pay
                </button>
            </div>

            <ToastContainer position="top-center" autoClose={1500} />
        </div>

    );
}

export default AddressPage;
