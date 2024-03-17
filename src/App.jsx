import React, {createContext, useContext, useEffect, useReducer, useState} from 'react';
import {BrowserRouter, Link, Navigate, Route, Routes} from 'react-router-dom';
import Home from "./components/Home";
import About from "./components/About";
import Careers from "./components/Careers";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Logo from "./Logo.png";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";

const ProductContext = createContext(null);

export const actionTypes = {
    SET_PRODUCTS: 'SET_PRODUCTS',
    ADD_TO_CART: 'ADD_TO_CART',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    SET_TOTAL: 'SET_TOTAL',
    HANDLE_PLUS: 'HANDLE_PLUS',
    HANDLE_MINUS: 'HANDLE_MINUS'
};

const initialState = {
    products: [],
    selectedProduct: null,
    cart: [],
    quantity: 1,
    total: 0
};

function reducer(state, action) {
    switch (action.type) {
        case actionTypes.SET_PRODUCTS:
            return {...state, products: action.products};
        case actionTypes.ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, {product: action.product, quantity: 1}]
            };
        case actionTypes.UPDATE_QUANTITY:
            return {
                ...state,
                products: state.products.map(prevProduct =>
                    prevProduct.id === action.product.id
                        ? {...prevProduct, quantity: action.newQuantity}
                        : prevProduct
                ),
                cart: state.cart.map(item =>
                    item.product.id === action.product.id
                        ? {...item, quantity: action.newQuantity}
                        : item
                ),
                quantity: action.newQuantity,
                total: action.newQuantity * action.product.price
            };
        case actionTypes.HANDLE_MINUS:
            const updatedCartMinus = state.cart.map(item => {
                if (item.product.id === action.product.id) {
                    const newQuantity = Math.max(item.quantity - 1, 0);
                    return {...item, quantity: newQuantity};
                }
                return item;
            });
            const minusTotal = updatedCartMinus.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
            return {
                ...state,
                cart: updatedCartMinus,
                total: minusTotal
            };

        case actionTypes.HANDLE_PLUS:
            const updatedCartPlus = state.cart.map(item => {
                if (item.product.id === action.product.id) {
                    const newQuantity = item.quantity + 1;
                    return {...item, quantity: newQuantity};
                }
                return item;
            });
            const plusTotal = updatedCartPlus.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
            return {
                ...state,
                cart: updatedCartPlus,
                total: plusTotal
            };
        case actionTypes.SET_TOTAL:
            return {...state, total: action.newTotal};
        default:
            return state;
    }
}

function init(initialState) {
    return initialState;
}

export const ProductProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState, init);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const fetchedProducts = await response.json();

                // Add a quantity property to each product object
                const productsWithQuantity = fetchedProducts.map(product => ({
                    ...product,
                    quantity: 0 // Initialize quantity to 0
                }));
                dispatch({type: actionTypes.SET_PRODUCTS, products: productsWithQuantity});
            } catch (err) {
                console.log("Error in fetching the data....", err);
            }
        };
        fetchData().then();
    }, []);

    useEffect(() => {
        const newTotal = state.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        dispatch({type: actionTypes.SET_TOTAL, newTotal});
    }, [state.cart, state.quantity]);

    return (
        <ProductContext.Provider value={{state, dispatch}}>
            {children}
        </ProductContext.Provider>
    );
};


export const useProductContext = () => useContext(ProductContext);

function App() {
    const [userName, setUserName] = useState('');

    const handleUser = (username) => {
        setUserName(username);
    };

    return (
        <ProductProvider>
            <BrowserRouter>
                <div>
                    {userName && <Navigate to="/" replace={true}/>}
                    <div className="navbar">
                        <div className="left-content">
                            <img src={Logo} alt="Logo" className="logo"/>
                            <span
                                /*split(\s+) splits the string into array of substrings....
                                * \w matches any word, digit....
                                * ^ specifies the beginning of the string*/
                                className="welcome-message">Welcome {userName.trim().split(/\s+/)[0].replace(/^\w/, (c) => c.toUpperCase())}</span>
                        </div>
                        <div className="nav-links">
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/about" className="nav-link">About</Link>
                            <Link to="/careers" className="nav-link">Careers</Link>
                            {!userName && <Link to="/login" className="nav-link">Login</Link>}
                            {!userName && <Link to="/signup" className="nav-link">Signup</Link>}
                            {userName && <Link to="/logout" className="nav-link">Logout</Link>}
                        </div>
                    </div>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/careers" element={<Careers/>}/>
                        <Route path="/login" element={<Login getCredentials={handleUser}/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path="/admin" element={<AdminLogin/>}/>
                        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </ProductProvider>
    );
}

export default App;
