import React, {createContext, useContext, useEffect, useState} from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import Home from "./components/Home";
import About from "./components/About";
import Careers from "./components/Careers";
import Logout from "./components/Logout";

const ProductContext = createContext(null);
export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                setProducts(await response.json());
            } catch (err) {
                console.log("Error in fetching the data....", err);
            }
        };
        fetchData().then();
    }, []);
    return (
        <ProductContext.Provider value={{products, selectedProduct, setSelectedProduct}}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => useContext(ProductContext);

function App() {

    return (
        <ProductProvider>
            <div>
                <BrowserRouter>
                    <div className="navbar">
                        <Link to="/">Home</Link>
                        <Link to="/about">about</Link>
                        <Link to="/careers">careers</Link>
                        <Link to="/logout">logout</Link>
                    </div>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/careers" element={<Careers/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </ProductProvider>
    );
}

export default App;
