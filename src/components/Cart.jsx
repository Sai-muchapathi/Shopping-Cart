import '../cart.css';
import React from "react";
import { useProductContext } from "./ProductProvider";
import { actionTypes } from "./ProductProvider";

export default function Cart() {
    const { state, dispatch } = useProductContext();
    const { cart, total } = state;

    const handleMinus = (product) => {
        dispatch({ type: actionTypes.HANDLE_MINUS, product });
    };

    const handlePlus = (product) => {
        dispatch({ type: actionTypes.HANDLE_PLUS, product });
    };

    return (
        <>
            <header>
                <h1>Shopping Cart</h1>
            </header>

            <div className="cart-container">
                <div className="product">
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {cart?.map((cartItem, index) => (
                            <li key={index} style={{display: "flex", alignItems: "center", marginBottom: "10px"}}>
                                <div>
                                    <img
                                        src={cartItem.product.image}
                                        alt={cartItem.product.title}
                                        style={{width: "50px", height: "50px"}}
                                    />
                                    <div className="quantity-controls">
                                        <button onClick={() => handleMinus(cartItem.product)}>-</button>
                                        <span>{cartItem.quantity}</span>
                                        <button onClick={() => handlePlus(cartItem.product)}>+</button>
                                    </div>
                                </div>
                                <div style={{marginLeft: "10px"}}>
                                    <h3>{cartItem.product.title}</h3>
                                    <p>{cartItem.product.price ? cartItem.product.price : 'Price not available'}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="total">
                    Total: {total?.toFixed(2)}
                </div>
            </div>
        </>
    );
}