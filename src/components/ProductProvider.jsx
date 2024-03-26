import React, { createContext, useContext, useEffect, useReducer } from "react";

const ProductContext = createContext(null);

export const actionTypes = {
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_USERS: 'SET_USERS',
    ADD_TO_CART: 'ADD_TO_CART',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    SET_TOTAL: 'SET_TOTAL',
    HANDLE_PLUS: 'HANDLE_PLUS',
    HANDLE_MINUS: 'HANDLE_MINUS'
};

const initialState = {
    products: [],
    cart: [],
    total: 0
};

function productReducer(state, action) {
    switch (action.type) {
        case actionTypes.SET_PRODUCTS:
            return { ...state, products: action.products };
        case actionTypes.SET_USERS:
            return { ...state, users: action.users };
        case actionTypes.ADD_TO_CART:
            const newCart = [...state.cart, { product: action.product, quantity: 1 }];
            return { ...state, cart: newCart };
        case actionTypes.UPDATE_QUANTITY:
            const updatedCart = state.cart.map(item =>
                item.product.id === action.product.id ? { ...item, quantity: action.newQuantity } : item
            );
            return { ...state, cart: updatedCart };
        case actionTypes.HANDLE_PLUS:
            const updatedPlusCart = state.cart.map(item =>
                item.product.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            return { ...state, cart: updatedPlusCart };
        case actionTypes.HANDLE_MINUS:
            const updatedMinusCart = state.cart.map(item =>
                item.product.id === action.product.id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
            );
            return { ...state, cart: updatedMinusCart };
        case actionTypes.SET_TOTAL:
            const newTotal = state.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
            return { ...state, total: newTotal };
        default:
            return state;
    }
}

function init(initialState) {
    return initialState;
}

export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState, init);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const fetchedProducts = await response.json();
                dispatch({ type: actionTypes.SET_PRODUCTS, products: fetchedProducts });
            } catch (error) {
                console.log("Error fetching products:", error);
            }
        };
        fetchData().then(r => r);
    }, []);

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/users");
                const fetchedUsers = await response.json();
                dispatch({ type: actionTypes.SET_USERS, users: fetchedUsers });
            } catch (error) {
                console.log("Error fetching users:", error);
            }
        };
        fetchUsersData().then(r => r);
    }, []);

    useEffect(() => {
        if (state.cart.length > 0) {
            const newTotal = state.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
            dispatch({ type: actionTypes.SET_TOTAL, newTotal });
        }
    }, [state.cart]);

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => useContext(ProductContext);
