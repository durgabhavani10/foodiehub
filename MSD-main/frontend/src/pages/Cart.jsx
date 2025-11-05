import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const goBack = () => navigate(-1);
  const proceedToPayment = () => navigate("/payment");

  return (
    <div className="cart-page">
      {/* Inline CSS Styles */}
      <style>{`
        .cart-page {
          padding: 20px;
          font-family: "Poppins", sans-serif;
          background-color: #fafafa;
          min-height: 100vh;
        }

        .cart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          border-bottom: 2px solid #eee;
          padding-bottom: 10px;
        }

        .cart-header button {
          background-color: #ff6347;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        .cart-header button:hover {
          background-color: #e5533c;
        }

        .cart-header h1 {
          font-size: 28px;
          color: #333;
          margin: 0 auto;
        }

        .empty-cart {
          text-align: center;
          color: #666;
          font-size: 18px;
          margin-top: 50px;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 25px;
        }

        .cart-item {
          display: flex;
          align-items: center;
          background: #fff;
          border-radius: 10px;
          padding: 15px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s;
        }

        .cart-item:hover {
          transform: scale(1.02);
        }

        .cart-image {
          width: 90px;
          height: 90px;
          border-radius: 8px;
          object-fit: cover;
          margin-right: 15px;
        }

        .cart-details {
          flex: 1;
        }

        .cart-details h3 {
          margin: 0;
          color: #222;
          font-size: 20px;
        }

        .cart-details p {
          color: #555;
          font-size: 16px;
          margin: 5px 0;
        }

        .remove-button {
          background-color: #ff4747;
          color: white;
          border: none;
          padding: 6px 10px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
        }

        .remove-button:hover {
          background-color: #e13d3d;
        }

        .cart-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #fff;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .cart-total h2 {
          margin: 0;
          font-size: 22px;
          color: #333;
        }

        .checkout-button {
          background-color: #28a745;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .checkout-button:hover {
          background-color: #218838;
        }

        @media (max-width: 600px) {
          .cart-item {
            flex-direction: column;
            align-items: flex-start;
          }
          .cart-image {
            width: 100%;
            height: auto;
            margin-bottom: 10px;
          }
          .cart-total {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }
        }
      `}</style>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-image" />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h2>Total: ₹{total.toFixed(2)}</h2>
            <button className="checkout-button" onClick={proceedToPayment}>
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
