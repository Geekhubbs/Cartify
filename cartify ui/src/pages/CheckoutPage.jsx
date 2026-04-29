import React, { useState } from 'react';
import '../styles/CheckoutPage.css';

const CheckoutPage = ({ cart, user, onBackToCart, onOrderSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'card' // 'card' or 'momo'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + (item.priceNum || parseFloat(item.price.replace('$', ''))) * item.quantity, 0);
  const shipping = 0; // Free shipping as per UI
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!formData.address || !formData.phone || !formData.city) {
      return setError('Please fill in all required shipping fields.');
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
          items: cart,
          totalAmount: total,
          shippingAddress: `${formData.address}, ${formData.city}, ${formData.zip}`
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to place order');

      // Redirect to Paystack
      window.location.href = data.authorization_url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-main">
        <h1 className="checkout-title">Checkout</h1>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handlePlaceOrder}>
          {/* Shipping Section */}
          <section className="checkout-section">
            <div className="section-header">
              <span className="section-icon">📍</span>
              <h2>Shipping Information</h2>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} readOnly className="read-only-input" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} readOnly className="read-only-input" />
              </div>
              <div className="form-group full-width">
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} readOnly className="read-only-input" />
              </div>
              <div className="form-group full-width">
                <label>Street Address</label>
                <input type="text" name="address" placeholder="123 Main St" value={formData.address} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" name="city" placeholder="Accra" value={formData.city} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input type="text" name="zip" placeholder="00233" value={formData.zip} onChange={handleInputChange} />
              </div>
              <div className="form-group full-width">
                <label>Phone Number</label>
                <input type="tel" name="phone" placeholder="+233..." value={formData.phone} onChange={handleInputChange} required />
              </div>
            </div>
          </section>

          {/* Payment Section */}
          <section className="checkout-section">
            <div className="section-header">
              <span className="section-icon">💳</span>
              <h2>Payment Method</h2>
            </div>
            <div className="payment-options">
              <label className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} />
                <div className="option-content">
                  <span className="option-icon">🏧</span>
                  <div className="option-text">
                    <strong>Credit / Debit Card</strong>
                    <span>Visa, Mastercard, etc.</span>
                  </div>
                </div>
              </label>
              <label className={`payment-option ${formData.paymentMethod === 'momo' ? 'selected' : ''}`}>
                <input type="radio" name="paymentMethod" value="momo" checked={formData.paymentMethod === 'momo'} onChange={handleInputChange} />
                <div className="option-content">
                  <span className="option-icon">📱</span>
                  <div className="option-text">
                    <strong>Mobile Money</strong>
                    <span>MTN, Vodafone, AirtelTigo</span>
                  </div>
                </div>
              </label>
            </div>
            <div className="security-notice">
              <span className="lock-icon">🔒</span>
              Your payment information is encrypted and secure. You will be redirected to Paystack to complete the payment.
            </div>
          </section>

          <div className="mobile-only-summary">
            <button type="submit" className="place-order-btn" disabled={loading}>
              {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
            </button>
            <button type="button" className="cancel-order-btn" onClick={onBackToCart}>Cancel Order</button>
          </div>
        </form>
      </div>

      {/* Order Summary Sidebar */}
      <aside className="checkout-sidebar">
        <div className="summary-card">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <div className="item-thumb">{item.icon}</div>
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <span>Qty: {item.quantity}</span>
                </div>
                <div className="item-price">${((item.priceNum || parseFloat(item.price.replace('$', ''))) * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span className="free-text">Free</span>
            </div>
            <div className="total-row">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="total-row grand-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button type="submit" className="place-order-btn desktop-only" onClick={handlePlaceOrder} disabled={loading}>
            {loading ? 'Processing...' : 'Place Order'}
          </button>
          <button type="button" className="cancel-order-btn desktop-only" onClick={onBackToCart}>Back to Cart</button>
        </div>
      </aside>
    </div>
  );
};

export default CheckoutPage;
