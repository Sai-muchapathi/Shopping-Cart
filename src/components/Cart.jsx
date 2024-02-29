import '../cart.css';
export default function Cart() {
    return (
        <>
            <header>
                <h1>Shopping Cart</h1>
            </header>

            <div className="cart-container">
                <div className="product">
                    <img src="" alt="Product 1"/>
                    <div>
                        <h3>Product 1</h3>
                        <p>Description of Product 1</p>
                    </div>
                    <div>
                        <input type="number" value="1" min="1"/>
                        <span>$19.99</span>
                    </div>
                </div>

                <div className="product">
                    <img src="" alt="Product 2"/>
                    <div>
                        <h3>Product 2</h3>
                        <p>Description of Product 2</p>
                    </div>
                    <div>
                        <input type="number" value="2" min="1"/>
                        <span>$29.99</span>
                    </div>
                </div>

                <div className="total">
                    Total: $49.98
                </div>
            </div>


        </>
    );
}