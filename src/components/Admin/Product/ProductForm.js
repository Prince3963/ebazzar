import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ product, onClose, onRefresh }) => {
    const [formData, setFormData] = useState({
        product_name: '',
        product_description: '',
        product_price: null,
        product_isActive: true,
        category_id: '',
    });

    const categories = [
        { id: '1', name: 'Electronics' },
        { id: '2', name: 'Fashion' },
        { id: '3', name: 'Home Appliances' },
        { id: '4', name: 'Books' },
    ];

    useEffect(() => {
        if (product) {
            const categoryMatch = categories.find(cat => cat.name === product.category_name);
            const matchedCategoryId = categoryMatch ? categoryMatch.id : '';

            setFormData({
                product_name: product.product_name,
                product_description: product.product_description,
                product_price: product.product_price,
                product_image: product.product_image,
                product_isActive: product.product_isActive,
                category_id: matchedCategoryId,
            });
        }
    }, [product]);



    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (name === 'product_price') {
            setFormData((prev) => ({
                ...prev,
                product_price: value || '', // Handle price as string
            }));
        } else if (name === 'product_image' && files) {
            setFormData((prev) => ({
                ...prev,
                product_image: files[0] || null, // Handle the image file
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData();
        const fileInput = document.getElementById("product_image");

        // Make sure fileInput is valid and has files
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            form.append("product_image", fileInput.files[0]);
        }

        // Append other form data
        form.append("product_name", formData.product_name || "");
        form.append("product_description", formData.product_description || "");
        form.append("category_id", formData.category_id || "");

        // Check if the price is valid (number, not null)
        if (formData.product_price && !isNaN(formData.product_price)) {
            form.append("product_price", formData.product_price);
        }

        const url = product
            ? `https://localhost:7219/api/Product/updateProduct/${product.product_id}`
            : "https://localhost:7219/api/Product/addProduct";

        const request = product ? axios.put(url, form) : axios.post(url, form);

        request
            .then((res) => {
                console.log("Response is:", res);
                onRefresh();
                onClose();
            })
            .catch((err) => {
                console.error("Error submitting form data:", err);
            });
    };





    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{product ? 'Edit' : 'Add'} Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <input name="product_name" placeholder="Name" className="w-full p-2 border" value={formData.product_name} onChange={handleChange} required />

                    <textarea name="product_description" placeholder="Description" className="w-full p-2 border" value={formData.product_description} onChange={handleChange} required />

                    <input name="product_price" id="product_price" type="number" placeholder="Price" className="w-full p-2 border" value={formData.product_price} onChange={handleChange} required />

                    <input type='file' name="product_image" id='product_image' placeholder="Image URL" className="w-full p-2 border" onChange={handleChange} />


                    <select
                        name="category_id"
                        className="w-full p-2 border"
                        value={formData.category_id}
                        onChange={handleChange}
                    >
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <div className="flex justify-end space-x-2">
                        <button type="submit" className="px-4 py-2 hover:bg-yellow-600 bg-blue-600 text-white rounded">Save</button>
                        <button type="button" className="px-4 py-2 hover:bg-yellow-600 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
