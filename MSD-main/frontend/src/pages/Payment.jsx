import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { orderAPI } from "../services/api";


const Payment = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
  });
  const [selectedPayment, setSelectedPayment] = useState("");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const totalAmount = storedCart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    setTotal(totalAmount);

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData({
        fullName: user.name || "",
        phoneNumber: user.phone || "",
        address: user.address || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const confirmOrder = async () => {
    const { fullName, phoneNumber, address } = formData;

    if (!fullName || !phoneNumber || !address) {
      alert("Please fill in all customer details.");
      return;
    }

    if (!selectedPayment) {
      alert("Please select a payment method.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderData = {
        customerName: fullName,
        phoneNumber,
        address,
        items: cart.map(item => ({
          menuItem: item._id,
          name: item.name,
          quantity: item.quantity || 1,
          price: item.price
        })),
        totalAmount: total,
        paymentMethod: selectedPayment,
        notes: ""
      };

      const response = await orderAPI.createOrder(orderData);
      
      localStorage.removeItem("cart");

      switch (selectedPayment) {
        case "phonepe":
          alert(`Order Placed Successfully! Order ID: ${response.data.data._id}`);
          navigate("/phonepe-payment");
          break;
        case "paytm":
          alert(`Order Placed Successfully! Order ID: ${response.data.data._id}`);
          navigate("/paytm-payment");
          break;
        case "cod":
          alert(`Order Placed Successfully! Order ID: ${response.data.data._id}\nThank you for ordering.`);
          navigate("/");
          break;
        default:
          alert("Invalid payment method selected.");
      }
    } catch (error) {
      console.error("Error processing order:", error);
      setError(error.response?.data?.message || "Failed to place order. Please try again.");
      alert(error.response?.data?.message || "There was an error processing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>💳 Payment Details</h2>
        <p style={styles.subheading}>Complete your order securely</p>
      </div>

      {error && <div style={{color: 'red', textAlign: 'center', marginBottom: '15px'}}>{error}</div>}

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>📦 Order Summary</h3>
        <div style={styles.orderList}>
          {cart.map((item, index) => (
            <div key={index} style={styles.orderItem}>
              <span style={styles.itemName}>{item.name}</span>
              <span style={styles.itemPrice}>₹{item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div style={styles.totalRow}>
          <span style={styles.totalLabel}>Total Amount:</span>
          <span style={styles.totalAmount}>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>👤 Customer Details</h3>
        <input
          type="text"
          id="fullName"
          placeholder="Full Name *"
          value={formData.fullName}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="tel"
          id="phoneNumber"
          placeholder="Phone Number *"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          id="address"
          placeholder="Delivery Address *"
          value={formData.address}
          onChange={handleChange}
          required
          style={styles.textarea}
          rows="3"
        />
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>💰 Select Payment Method</h3>
        <div style={styles.paymentOptions}>
          <label style={{...styles.paymentLabel, ...(selectedPayment === 'phonepe' ? styles.paymentLabelActive : {})}}>
            <input
              type="radio"
              name="payment"
              value="phonepe"
              onChange={handlePaymentChange}
              style={styles.radio}
            />
            <span style={styles.paymentIcon}>📱</span>
            <span style={styles.paymentText}>PhonePe</span>
          </label>
          <label style={{...styles.paymentLabel, ...(selectedPayment === 'paytm' ? styles.paymentLabelActive : {})}}>
            <input
              type="radio"
              name="payment"
              value="paytm"
              onChange={handlePaymentChange}
              style={styles.radio}
            />
            <span style={styles.paymentIcon}>💳</span>
            <span style={styles.paymentText}>Paytm</span>
          </label>
          <label style={{...styles.paymentLabel, ...(selectedPayment === 'cod' ? styles.paymentLabelActive : {})}}>
            <input
              type="radio"
              name="payment"
              value="cod"
              onChange={handlePaymentChange}
              style={styles.radio}
            />
            <span style={styles.paymentIcon}>💵</span>
            <span style={styles.paymentText}>Cash on Delivery</span>
          </label>
        </div>
      </div>

      <button style={styles.button} onClick={confirmOrder} disabled={loading}>
        {loading ? '⏳ Processing...' : '🛒 Confirm Order'}
      </button>
    </div>
  );
};

// Enhanced inline styling
const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
    fontFamily: "'Poppins', Arial, sans-serif",
    backgroundColor: "#ffffff",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "2px solid #f0f0f0",
  },
  heading: { 
    color: "#ff6b35",
    fontSize: "32px",
    marginBottom: "8px",
  },
  subheading: {
    color: "#666",
    fontSize: "14px",
  },
  section: { 
    marginBottom: "30px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
  },
  sectionTitle: {
    fontSize: "20px",
    color: "#333",
    marginBottom: "15px",
    fontWeight: "600",
  },
  orderList: {
    marginBottom: "15px",
  },
  orderItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
    backgroundColor: "white",
    marginBottom: "8px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  itemName: {
    fontSize: "16px",
    color: "#333",
  },
  itemPrice: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ff6b35",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    backgroundColor: "#fff3e0",
    borderRadius: "8px",
    marginTop: "10px",
  },
  totalLabel: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
  },
  totalAmount: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#d7263d",
  },
  input: {
    width: "100%",
    padding: "14px",
    margin: "8px 0",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "15px",
    transition: "border-color 0.3s ease",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "14px",
    margin: "8px 0",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "15px",
    fontFamily: "'Poppins', Arial, sans-serif",
    resize: "vertical",
    transition: "border-color 0.3s ease",
    boxSizing: "border-box",
  },
  paymentOptions: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  paymentLabel: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "white",
    borderRadius: "10px",
    border: "2px solid #e0e0e0",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  paymentLabelActive: {
    borderColor: "#ff6b35",
    backgroundColor: "#fff3e0",
    boxShadow: "0 4px 12px rgba(255, 107, 53, 0.2)",
  },
  radio: {
    marginRight: "12px",
    width: "20px",
    height: "20px",
    cursor: "pointer",
  },
  paymentIcon: {
    fontSize: "24px",
    marginRight: "12px",
  },
  paymentText: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
  },
  button: {
    width: "100%",
    padding: "18px",
    background: "linear-gradient(135deg, #ff6b35 0%, #d7263d 100%)",
    color: "white",
    fontSize: "18px",
    fontWeight: "600",
    textAlign: "center",
    borderRadius: "10px",
    cursor: "pointer",
    border: "none",
    marginTop: "20px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 4px 12px rgba(255, 107, 53, 0.3)",
  },
};

export default Payment;
