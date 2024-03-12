import React, {createContext, useContext, useEffect, useState} from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import Home from "./components/Home";
import About from "./components/About";
import Careers from "./components/Careers";
import Logout from "./components/Logout";
import Cart from "./components/Cart";

const ProductContext = createContext(null);
export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);

    const updateQuantity = (product, newQuantity) => {
        setProducts((prevProducts) =>
            prevProducts.map((prevProduct) =>
                prevProduct.id === product.id
                    ? { ...prevProduct, quantity: newQuantity }
                    : prevProduct
            )
        );

        setCart((prevCart) =>
            prevCart.map((item) =>
                item.product.id === product.id
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );

        setQuantity(newQuantity);
        setTotal(() => newQuantity * product.price);
    };


    const handleMinus = (product, currentQuantity) => {
        if (currentQuantity > 0) {
            const newQuantity = currentQuantity - 1;
            updateQuantity(product, newQuantity);
        }
    };

    const handlePlus = (product, currentQuantity) => {
        const newQuantity = currentQuantity + 1;
        updateQuantity(product, newQuantity);
    };


    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.product.id === product.id);

            if (existingProduct) {
                return prevCart.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { product, quantity : 1 }];
            }
        });

        setQuantity((prevQuantity) => prevQuantity + 1);
        setTotal((prevTotal) => prevTotal + product.price);
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const fetchedProducts = await response.json();

                // Add a quantity property to each product object
                const productsWithQuantity = fetchedProducts.map((product) => ({
                    ...product,
                    quantity: 0, // Initialize quantity to 0
                }));
                setProducts(productsWithQuantity);
            } catch (err) {
                console.log("Error in fetching the data....", err);
            }
        };
        fetchData().then();
    }, []);

    useEffect(() => {
        const newTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        setTotal(newTotal);
    }, [cart, quantity]);
    return (<ProductContext.Provider value={{products, selectedProduct, setSelectedProduct, cart, quantity, total, addToCart, handlePlus, handleMinus}}>
        {/*
             The purpose of using {children} within the ProductProvider component is to wrap its child components with
             the ProductContext.Provider. This allows the child components to access the context provided
             by ProductContext.
             */}
        {children}
    </ProductContext.Provider>);
};

export const useProductContext = () => useContext(ProductContext);

function App() {

    return (<ProductProvider>
        <div>
            <BrowserRouter>
                <div className="navbar">
                    <Link to="/">Home</Link>
                    <Link to="/about">about</Link>
                    <Link to="/careers">careers</Link>
                    <Link to="/logout">logout</Link>
                    <Link to="/cart">cart</Link>
                </div>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/careers" element={<Careers/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    </ProductProvider>);
}

export default App;
