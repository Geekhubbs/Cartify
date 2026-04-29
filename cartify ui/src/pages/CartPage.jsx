import React from 'react';
import '../styles/CartPage.css';

const CartPage = ({ cart, onRemove, onUpdateQuantity, onContinueShopping, onCheckout }) => {
  const subtotal = cart.reduce((sum, item) => sum + ((item.price_num || item.priceNum || parseFloat(item.price.replace('$', ''))) * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 15;
  const tax = subtotal * 0.1; // 10% tax mock
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="cart-container empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p style={{ color: 'var(--text-muted)', margin: '16px 0 32px' }}>
          Looks like you haven't added anything to your cart yet.
        </p>
        <button className="checkout-btn" style={{ maxWidth: '250px', margin: '0 auto' }} onClick={onContinueShopping}>
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>
      
      <div className="cart-layout">
        {/* Left Side: Items */}
        <div className="cart-items-side">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-img">{item.icon}</div>
              
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <div className="cart-item-price">{item.price}</div>
              </div>

              <button className="remove-item-btn" onClick={() => onRemove(item.id)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>

              <div className="cart-qty-selector">
                <button className="cart-qty-btn" onClick={() => onUpdateQuantity(item.id, -1)}>−</button>
                <div className="cart-qty-val">{item.quantity}</div>
                <button className="cart-qty-btn" onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Summary */}
        <div className="order-summary-side">
          <h3>Order Summary</h3>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          
          <div className="summary-row">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className="checkout-btn" onClick={onCheckout}>
            Proceed to Checkout
          </button>
          
          <button className="continue-shopping-btn" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
