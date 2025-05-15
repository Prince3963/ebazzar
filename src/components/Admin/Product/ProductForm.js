import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ product, onClose, onRefresh }) => {
    const [formData, setFormData] = useState({
        product_name: '',
        product_description: '',
        product_price: '',
        product_image: '',
        product_isActive: true,
        category_id: '',
    });

    useEffect(() => {
        if (product) {
            setFormData({
                product_name: product.product_name,
                product_description: product.product_description,
                product_price: product.product_price,
                product_image: product.product_image,
                product_isActive: product.product_isActive,
                category_id: product.category_id || '', 
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData();
        // form.append("ProductPrice", formData.product_price);
        for (const key in formData) {
            form.append(key, formData[key]?.toString());
        }
        if (product) {
            axios.put(`https://localhost:7219/api/Product/updateProduct/${product.product_id}`, form)
                .then((res) => {
                    console.log("Response is : ", res);
                    onRefresh();
                    onClose();
                }).catch((err) => {
                    console.log("Product is not updated : ", err)
                });

        } else {
            axios.post("https://localhost:7219/api/Product/addProduct", form)

                .then((response) => {
                    console.log("Response:", response);
                    onRefresh();
                    onClose();
                })
                .catch((err) => {
                    console.error("Error submitting form data:", err);
                });
        }
    }




    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{product ? 'Edit' : 'Add'} Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <input name="product_name" placeholder="Name" className="w-full p-2 border" value={formData.product_name} onChange={handleChange} required />

                    <textarea name="product_description" placeholder="Description" className="w-full p-2 border" value={formData.product_description} onChange={handleChange} required />

                    <input name="product_price" type="number" placeholder="Price" className="w-full p-2 border" value={formData.product_price} onChange={handleChange} required />

                    <input type='file' name="product_image" placeholder="Image URL" className="w-full p-2 border" value={formData.product_image} onChange={handleChange} />


                    <select
                        name="category_id"
                        className='w-full p-2 border'
                        value={formData.category_id} // Bind value to formData.category_id
                        onChange={handleChange} 
                    >
                        <option value="default">Select Category</option>
                        <option value="1">Electric</option>
                        <option value="2">Cloths</option>
                        {/* Add more categories here */}
                    </select>


                    <div className="flex justify-end space-x-2">
                        <button type="button" className="px-4 py-2 hover:bg-yellow-600 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
                        <button type="submit" className="px-4 py-2 hover:bg-yellow-600 bg-blue-600 text-white rounded">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
