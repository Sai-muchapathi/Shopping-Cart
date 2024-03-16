import '../login.css';

export default function Login({getCredentials}) {
    function storeUserCreds(event) {
        event.preventDefault();
        const username = event.target.elements.username.value;
        getCredentials(username);
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={storeUserCreds}  >
                <input type="text" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
            <div className="social-login">
                <p>Or sign in with:</p>
                <div className="social-icons">
                    <a href="www.facebook.com" className="social-icon facebook">Facebook</a>
                    <a href="www.twitter.com" className="social-icon twitter">Twitter</a>
                    <a href="www.google.com" className="social-icon google">Google</a>
                </div>
            </div>
        </div>
    );
}
