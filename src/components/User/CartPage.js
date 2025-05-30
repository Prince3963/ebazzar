import axios from 'axios'
import React, { useEffect, useState } from 'react'

function CartPage() {
    const [cartItem, setCartItem] = useState([]);

    const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };
  
    useEffect(() => {

        axios.get("https://localhost:7219/api/Cart/view"
            // {
            //     headers: {
            //         "Authorization": "Bearer " + getCookie("token")
            //     }
            // }
        )
            .then((res) => {
                setCartItem(res.data)
                console.log("response data ", res.data)
            }).catch((err) => {
                console.error("An error occured! ".err)
            });
    }, [])

    //Two time API calling 

    return (
        <div>
            <h1>Cart items</h1>
            {cartItem.map((cartItem) => (
                <div key={cartItem.cartItmeId}>
                    <p>Product name : {cartItem.ProductName}</p>
                    <p>Quantity : {cartItem.quantity}</p>
                    <p>Product Price : {cartItem.ProductPrice}</p>
                    <img src={cartItem.productImageURL} alt='Helllolooooo' />
                </div>
            ))}
        </div>
    )
}

export default CartPage