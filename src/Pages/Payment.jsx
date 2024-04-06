import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToastNotification from '../Components/ToastNotification';
import './style1.css';

function Payment() {
    const [amount] = useState('100'); // Setting amount to a fixed value of '100'
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        var options = {
            key: "rzp_test_4wG56zx78jQ4WI",
            key_secret: "ECMxuuBPWcGQZEVU7AZU6BjH",
            amount: amount * 100, 
            currency: "INR",
            name: "LearnIt",
            description: "subscription payment",
            handler: function (response) {
                setShowToast(true);
                navigate("/register");
            },
            prefill: {
                name: "Ashik",
                email: "ashikjoseph17@gmail.com",
                contact: "9656164410"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "blue"
            }
        };

        var pay = new window.Razorpay(options);
        pay.open();
    };

    return (
        <div className="payment-container">
            <div className="cardp">
                <h2>Subscrbe Us</h2>
                <br />
                <p>Amount: {amount}</p>
                <br />
                <button onClick={handleSubmit}>Submit</button>
                {showToast && <ToastNotification message="A confirmation mail will be sent to your email ID within 24 hours." onClose={() => setShowToast(false)} />}
            </div>
        </div>
    );
}

export default Payment;








