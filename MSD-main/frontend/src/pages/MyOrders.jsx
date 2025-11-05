import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      const API_URL = import.meta.env.VITE_API_URL || 'https://msd-backend-crhk.onrender.com/api';
      const response = await fetch(`${API_URL}/orders/my-orders`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setOrders(data.data || []);
      } else {
        setError(data.message || 'Failed to load orders');
      }
    } catch (err) {
      setError('Unable to connect to server');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return '#ffa500';
      case 'confirmed': return '#2196F3';
      case 'preparing': return '#9C27B0';
      case 'out for delivery': return '#FF9800';
      case 'delivered': return '#4CAF50';
      case 'cancelled': return '#f44336';
      default: return '#757575';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return '⏳';
      case 'confirmed': return '✅';
      case 'preparing': return '👨‍🍳';
      case 'out for delivery': return '🚚';
      case 'delivered': return '✓';
      case 'cancelled': return '✗';
      default: return '📦';
    }
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="container">
          <div className="error-message">
            <h2>⚠️ Error</h2>
            <p>{error}</p>
            <button onClick={fetchOrders} className="retry-btn">Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <div className="orders-header">
          <h1>🍴 My Orders</h1>
          <p>Track your food delivery orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">📦</div>
            <h2>No Orders Yet</h2>
            <p>You haven't placed any orders yet. Start ordering delicious food!</p>
            <button onClick={() => navigate('/menu')} className="order-now-btn">
              Order Now
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="order-id">
                    <span className="label">Order ID:</span>
                    <span className="value">#{order._id.slice(-8).toUpperCase()}</span>
                  </div>
                  <div className="order-date">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                <div className="order-status-timeline">
                  <div className="status-badge" style={{ backgroundColor: getStatusColor(order.status) }}>
                    <span className="status-icon">{getStatusIcon(order.status)}</span>
                    <span className="status-text">{order.status || 'Pending'}</span>
                  </div>
                </div>

                <div className="order-items">
                  <h3>📋 Order Items ({order.items?.length || 0})</h3>
                  <div className="items-list">
                    {order.items?.map((item, index) => (
                      <div key={index} className="order-item">
                        <div className="item-image">
                          <img 
                            src={item.image || 'https://via.placeholder.com/80'} 
                            alt={item.name}
                            onError={(e) => e.target.src = 'https://via.placeholder.com/80?text=No+Image'}
                          />
                        </div>
                        <div className="item-details">
                          <h4>{item.name}</h4>
                          <p className="item-quantity">Quantity: {item.quantity || 1}</p>
                        </div>
                        <div className="item-price">
                          ₹{item.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-delivery-info">
                  <div className="info-row">
                    <span className="info-label">📍 Delivery Address:</span>
                    <span className="info-value">{order.deliveryAddress || 'Not specified'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">💳 Payment Method:</span>
                    <span className="info-value">{order.paymentMethod || 'COD'}</span>
                  </div>
                  {order.paymentStatus && (
                    <div className="info-row">
                      <span className="info-label">💰 Payment Status:</span>
                      <span className={`payment-status ${order.paymentStatus.toLowerCase()}`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  )}
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    <span className="total-label">Total Amount:</span>
                    <span className="total-amount">₹{order.totalAmount || 0}</span>
                  </div>
                  <div className="order-actions">
                    {order.status?.toLowerCase() === 'delivered' && (
                      <button className="action-btn reorder-btn">
                        🔄 Reorder
                      </button>
                    )}
                    {['pending', 'confirmed'].includes(order.status?.toLowerCase()) && (
                      <button className="action-btn cancel-btn">
                        ✗ Cancel Order
                      </button>
                    )}
                    <button className="action-btn track-btn">
                      📍 Track Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
