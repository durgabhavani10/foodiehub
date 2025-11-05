import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";

const PhonePePayment = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState("0.00");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const storedTotal = localStorage.getItem("total") || "0.00";
    setTotal(storedTotal);

    // Generate the QR code when the component loads
    generateQRCode(storedTotal);
  }, []);

  const generateUPILink = (amount) => {
    const upiID = "9121731449@ptsbi"; // replace with your UPI ID
    const name = "Your Business";
    const transactionNote = "Order Payment";
    const currency = "INR";

    return `upi://pay?pa=${upiID}&pn=${encodeURIComponent(
      name
    )}&am=${amount}&cu=${currency}&tn=${encodeURIComponent(transactionNote)}`;
  };

  const generateQRCode = async (amount) => {
    const upiLink = generateUPILink(amount);
    try {
      const url = await QRCode.toDataURL(upiLink);
      setQrCodeUrl(url);
    } catch (err) {
      console.error("Error generating QR code", err);
    }
  };

  const confirmPayment = () => {
    const isPaid = window.confirm("Did you complete the payment?");

    if (isPaid) {
      setMessage({
        text: "✅ Payment Successful! Your order has been placed.",
        type: "success",
      });
      localStorage.removeItem("cart");
      localStorage.removeItem("total");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setMessage({
        text: "❌ Payment Failed! Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.heading}>PhonePe Payment</h2>

        <p style={styles.total}>
          Total: ₹<span>{total}</span>
        </p>

        <div style={styles.qrContainer}>
          {qrCodeUrl ? (
            <img src={qrCodeUrl} alt="QR Code" width={200} height={200} />
          ) : (
            <p>Generating QR Code...</p>
          )}
        </div>

        <button style={styles.button} onClick={confirmPayment}>
          Confirm Payment
        </button>

        {message.text && (
          <p
            style={{
              ...styles.message,
              ...(message.type === "success" ? styles.success : styles.error),
            }}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: 0,
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  container: {
    maxWidth: "400px",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  heading: { color: "#d32f2f" },
  total: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: "20px",
  },
  qrContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 0",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "15px",
    background: "#4CAF50",
    color: "white",
    fontSize: "18px",
    textAlign: "center",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    marginTop: "20px",
    transition: "0.3s",
  },
  message: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "20px",
    padding: "10px",
    borderRadius: "5px",
  },
  success: {
    backgroundColor: "#4CAF50",
    color: "white",
  },
  error: {
    backgroundColor: "#d32f2f",
    color: "white",
  },
};

export default PhonePePayment;
