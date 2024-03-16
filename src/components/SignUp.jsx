import '../signup.css';

export default function Signup() {
    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form className="signup-form">
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
                <button type="submit">Sign Up</button>
            </form>
            <div className="social-signup">
                <p>Or sign up with:</p>
                <div className="social-icons">
                    <a href="www.facebook.com" className="social-icon facebook">Facebook</a>
                    <a href="www.twitter.com" className="social-icon twitter">Twitter</a>
                    <a href="www.google.com" className="social-icon google">Google</a>
                </div>
            </div>
        </div>
    );
}
