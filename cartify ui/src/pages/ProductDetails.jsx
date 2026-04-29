import React, { useState } from 'react';
import '../styles/ProductDetails.css';

const ProductDetails = ({ product, onBack, onNavigateShop, onNavigateCategory, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleQtyChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  return (
    <div className="product-details-container">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs">
        <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} className="breadcrumb-link">Home</a>
        <span>/</span>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigateShop(); }} className="breadcrumb-link">Shop</a>
        <span>/</span>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigateCategory(product.category); }} className="breadcrumb-link">{product.category}</a>
        <span>/</span>
        <span style={{ color: 'var(--text)', fontWeight: 600 }}>{product.name}</span>
      </nav>

      <div className="product-main">
        {/* Left Side: Image */}
        <div className="product-image-side">
          {product.icon}
        </div>

        {/* Right Side: Info */}
        <div className="product-info-side">
          <h1 className="product-title">{product.name}</h1>
          
          <div className="rating-row">
            <div className="stars">
              {'★'.repeat(5)}
            </div>
            <span className="rating-text">4.8 (324 reviews)</span>
          </div>

          <div className="price-row">
            <span className="product-price-large">{product.price}</span>
            <span className="stock-badge">In Stock</span>
          </div>

          <p className="product-desc">
            Experience premium sound quality with active noise cancellation technology. 
            These {product.name.toLowerCase()} feature long-lasting battery life, 
            comfortable ergonomic design, and crystal-clear audio for all your needs.
          </p>

          <div className="features-section">
            <h4>Key Features:</h4>
            <ul className="features-list">
              <li className="feature-item"><span className="feature-dot"></span> Active Noise Cancellation</li>
              <li className="feature-item"><span className="feature-dot"></span> 30-hour battery life</li>
              <li className="feature-item"><span className="feature-dot"></span> Bluetooth 5.0 connectivity</li>
              <li className="feature-item"><span className="feature-dot"></span> Premium sound quality</li>
              <li className="feature-item"><span className="feature-dot"></span> Comfortable design</li>
              <li className="feature-item"><span className="feature-dot"></span> Foldable and portable</li>
            </ul>
          </div>

          <div className="controls-row">
            <div className="qty-selector">
              <button className="qty-btn-details" onClick={() => handleQtyChange(-1)}>−</button>
              <div className="qty-input">{quantity}</div>
              <button className="qty-btn-details" onClick={() => handleQtyChange(1)}>+</button>
            </div>
            
            <button className="add-to-cart-btn-large" onClick={() => onAddToCart(product, quantity)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Add to Cart
            </button>

            <button className="wishlist-btn-details">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges">
            <div className="trust-item">
              <div className="trust-icon">🚚</div>
              <div className="trust-text">
                <h5>Free Shipping</h5>
                <p>On orders over $50</p>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon">🛡️</div>
              <div className="trust-text">
                <h5>2 Year Warranty</h5>
                <p>Full protection</p>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon">🔄</div>
              <div className="trust-text">
                <h5>30-Day Returns</h5>
                <p>No questions asked</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
