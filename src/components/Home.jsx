import { useEffect, useState } from "react";

export default function Home() {
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

    function handleProductClick(id) {
        setSelectedProduct(products.find(product => product.id === id));
    }

    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1, marginRight: "20px" }}>
                <h1>Welcome to the store</h1>
                <ul className="product-list">
                    {products.map((product) => (
                        <li
                            key={product.id}
                            className={`product-item ${selectedProduct && selectedProduct.id === product.id ? "selected" : ""}`}
                            onClick={() => handleProductClick(product.id)}
                        >
                            <img src={product.image} alt={product.title} className="product-image" />
                            <h3>{product.title}</h3>
                            <h6>{product.description}</h6>
                            <button>Add to cart</button>
                        </li>
                    ))}
                </ul>
            </div>

            {selectedProduct && (
                <div style={{ flex: 1 }}>
                    <br/>
                    <h2>Selected Product Details</h2>
                    <div className="selected-product">
                        <img src={selectedProduct.image} alt={selectedProduct.title} className="product-image" />
                        <h3>{selectedProduct.title}</h3>
                        <h6>{selectedProduct.description}</h6>
                    </div>
                </div>
            )}
        </div>
    );
}
