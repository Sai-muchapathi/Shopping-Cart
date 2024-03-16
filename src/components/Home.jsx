import React, { Suspense, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useProductContext } from "../App";
import { Loading } from "./Loading";

export default function Home() {
    const { state, dispatch } = useProductContext();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Simulate data fetching delay for 2 seconds
    setTimeout(() => setLoading(false), 2000);

    function handleProductClick(id) {
        setSelectedProduct(state.products.find(product => product.id === id));
    }

    const { products } = state;

    return (
        <Suspense fallback={<Loading/>}>
            {loading ? (
                <Loading/>
            ) : (
                <div style={{display: "flex"}}>
                    <div style={{flex: 1, marginRight: "20px"}}>
                        <h1>Welcome to the store</h1>
                        <Link to="/cart" className="go-to-cart-button">
                            <FontAwesomeIcon icon={faShoppingBasket} className="cart-icon"/>
                            Go to Cart
                        </Link>

                        <ul className="product-list">
                            {products.map((product) => (
                                <li
                                    key={product.id}
                                    className={`product-item ${selectedProduct && selectedProduct.id === product.id ? "selected" : ""}`}
                                >
                                    <img src={product.image} alt={product.title} className="product-image"
                                         onClick={() => handleProductClick(product.id)}/>
                                    <h3>{product.title}</h3>
                                    <h6>{product.description}</h6>
                                    <button onClick={() => dispatch({type: 'ADD_TO_CART', product})}>Add to cart</button>
                                    <button>wishlist❤</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {selectedProduct && (
                        <div style={{flex: 1}}>
                            <br/>
                            <h2>Selected Product Details</h2>
                            <div className="selected-product">
                                <img src={selectedProduct.image} alt={selectedProduct.title} className="product-image"/>
                                <h3>{selectedProduct.title}</h3>
                                <h6>{selectedProduct.description}</h6>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </Suspense>
    );
}
