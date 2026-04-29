import React, { useEffect, useState } from 'react';
import '../styles/ProfilePage.css';

const ProfilePage = ({ user, favorites, products, onSignOut, onSelectProduct, onBackToShop }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    checkPaymentStatus();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/user/${user.id}`);
      const data = await response.json();
      if (response.ok) setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get('reference');
    if (reference) {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/verify/${reference}`);
        if (response.ok) {
          fetchOrders(); // Refresh orders to show 'paid' status
          
          // Clear cart in DB
          const token = localStorage.getItem('token');
          await fetch('http://localhost:5000/api/cart/clear', {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          // Clean up URL
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch (err) {
        console.error('Payment verification failed:', err);
      }
    }
  };

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="user-card-large">
          <div className="avatar-large">{user.name[0].toUpperCase()}</div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <button className="sign-out-btn" onClick={onSignOut}>Sign Out</button>
        </div>

        <nav className="profile-nav">
          <a href="#orders" className="active">My Orders</a>
          <a href="#favorites">Favorites</a>
          <a href="#settings">Settings</a>
        </nav>
      </div>

      <div className="profile-content">
        <section id="orders" className="profile-section">
          <h2 className="section-title">My Orders</h2>
          {loading ? (
            <p>Loading your orders...</p>
          ) : orders.length > 0 ? (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-meta">
                      <span className="order-id">Order #{order.id}</span>
                      <span className="order-date">Placed on {order.date}</span>
                    </div>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="order-items">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item">
                        <div className="item-thumb">
                          {products.find(p => p.id === item.product_id)?.icon || '📦'}
                        </div>
                        <div className="item-details">
                          <h4>{item.product_name}</h4>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                        <div className="item-price">${parseFloat(item.price).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <div className="order-total-label">Total</div>
                    <div className="order-total-value">${parseFloat(order.total_amount).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>You haven't placed any orders yet.</p>
              <button className="text-link" onClick={onBackToShop}>Start Shopping</button>
            </div>
          )}
        </section>

        <section id="favorites" className="profile-section">
          <h2 className="section-title">Favorites</h2>
          {favoriteProducts.length > 0 ? (
            <div className="favorites-grid">
              {favoriteProducts.map(product => (
                <div key={product.id} className="fav-product-card" onClick={() => onSelectProduct(product)}>
                  <div className="fav-product-img">{product.icon}</div>
                  <div className="fav-product-info">
                    <h4>{product.name}</h4>
                    <p>{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>You haven't favorited any products yet.</p>
              <button className="text-link" onClick={onBackToShop}>Explore Products</button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
