import React, { Suspense, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useProductContext } from "./ProductProvider";
import { Loading } from "./Loading";

const handleProductClick = (id, setSelectedProduct, products) => {
    setSelectedProduct(products.find(product => product.id === id));
};

export default function Home() {
    const { state, dispatch } = useProductContext();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const { products } = state;

    useEffect(() => {
        // Simulate data fetching delay for 2 seconds
        const fetchData = setTimeout(() => setLoading(false), 2000);
        // Clean up function to clear timeout if component unmounts
        return () => clearTimeout(fetchData);
    }, [products]);

    const productsList = useMemo(() => (
        products?.map((product) => (
            <li
                key={product.id}
                className={`product-item ${selectedProduct && selectedProduct.id === product.id ? "selected" : ""}`}
            >
                <img src={product.image} alt={product.title} className="product-image"
                     onClick={() => handleProductClick(product.id, setSelectedProduct, products)}/>
                <h3>{product.title}</h3>
                <h6>{product.description}</h6>
                <button onClick={() => dispatch({ type: 'ADD_TO_CART', product })}>Add to cart</button>
                <button>wishlist❤</button>
            </li>
        ))
    ), [products, selectedProduct, dispatch]);

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
                            {productsList}
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
