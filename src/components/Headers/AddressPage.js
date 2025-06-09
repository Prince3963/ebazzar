import React, { useState, useEffect } from "react";
import axios from "axios";

function AddressPage() {
    const [form, setForm] = useState({
        number: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        landmark: "",
        country: "",
        isDefault: "True",
        // username: "",
        // mobile: "",
    });

    const [addresses, setAddresses] = useState([]);
    // const user_id = localStorage.getItem("user_id");

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
            // const user_id = localStorage.getItem("user_id"); // ✅ Get user_id here

            const payload = { ...form }; // ✅ Include it in payload

            const res = await axios.post(
                "https://localhost:7219/api/Address",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.data.status) {
                alert("Address Saved!");
                fetchAddresses();
                setForm({
                    number: "",
                    street: "",
                    city: "",
                    state: "",
                    zipCode: "",
                    landmark: "",
                    country: "",
                    isDefault: "false",
                    // username: "",
                    // mobile: "",
                });
            }
        } catch (err) {
            console.error("Error saving address:", err);
        }
    };



    const fetchAddresses = async () => {
        try {
            const token = localStorage.getItem("token");
            const user_id = localStorage.getItem("user_id");

            if (!user_id) {
                console.error("User ID not found!");
                return;
            }

            const res = await axios.get(`https://localhost:7219/api/Address/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.status) {
                setAddresses(res.data.data);
            }
        } catch (err) {
            console.error("Error fetching addresses:", err);
        }
    };



    useEffect(() => {
        fetchAddresses();
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add Address</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Full Name" required className="p-2 border rounded" />
                <input type="text" name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile Number" required className="p-2 border rounded" /> */}
                <input type="text" name="number" value={form.number} onChange={handleChange} placeholder="House/Flat No." required className="p-2 border rounded" />
                <input type="text" name="street" value={form.street} onChange={handleChange} placeholder="Street" className="p-2 border rounded" />
                <input type="text" name="landmark" value={form.landmark} onChange={handleChange} placeholder="Landmark" className="p-2 border rounded" />
                <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="City" required className="p-2 border rounded" />
                <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="State" required className="p-2 border rounded" />
                <input type="text" name="zipCode" value={form.zipCode} onChange={handleChange} placeholder="Zipcode" required className="p-2 border rounded" />
                <input type="text" name="country" value={form.country} onChange={handleChange} placeholder="Country" className="p-2 border rounded" />

                <button type="submit" className="col-span-2 bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
                    Save Address
                </button>
            </form>

            <hr className="my-6" />

            <h3 className="text-xl font-semibold mb-3">Your Saved Addresses</h3>
            <ul className="space-y-4">
                {addresses.map(addr => (
                    <li key={addr.address_id} className="bg-white p-4 shadow rounded">
                        <div><strong>{addr.username}</strong> ({addr.mobile})</div>
                        <div>{addr.number}, {addr.street}, {addr.city}, {addr.state}, {addr.zipCode}, {addr.country}</div>
                        <div>{addr.landmark}</div>
                        <div className="text-sm text-gray-500">Default: {addr.isDefault}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AddressPage;
