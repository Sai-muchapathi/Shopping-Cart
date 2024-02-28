import React from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import Home from "./components/Home";
import About from "./components/About";
import Careers from "./components/Careers";
import Logout from "./components/Logout";

function App() {
    return (
        <div>
            <BrowserRouter>
                <div className="navbar">
                    <Link to="/">Home</Link>
                    <Link to="/about">about</Link>
                    <Link to="/careers">careers</Link>
                    <Link to="/logout">logout</Link>
                </div>
                <Routes>
                    <Route path="/"/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/careers" element={<Careers/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                </Routes>
            </BrowserRouter>
            <Home/>
        </div>
    );
}

export default App;
