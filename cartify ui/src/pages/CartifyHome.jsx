import React, { useState } from 'react';
import '../styles/CartifyHome.css';
import { SignInForm, SignUpForm } from './AuthPages';
import ProductDetails from './ProductDetails';
import ShopPage from './ShopPage';
import CartPage from './CartPage';
import ProfilePage from './ProfilePage';
import CheckoutPage from './CheckoutPage';

// ─── SVG Icons ────────────────────────────────────────────────────────────
const Icons = {
  Logo: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  ),
  Search: () => (
    <svg width="16" height="16" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  Cart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  ),
  Profile: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  )
};

const CartifyHome = ({ 
  view = 'home', 
  setView, 
  selectedProduct, 
  selectedCategory,
  cart,
  currentUser,
  favorites,
  products = [],
  orders,
  onSelectProduct, 
  onSelectCategory,
  onBackToHome,
  onStartShopping,
  onAddToCart,
  onRemoveFromCart,
  onUpdateCartQuantity,
  onLogin,
  onSignOut,
  onToggleFavorite
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="home-wrapper">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left" onClick={() => { setSearchTerm(''); onBackToHome(); }} style={{ cursor: 'pointer' }}>
          <div className="logo">
            <div className="logo-icon">
              <Icons.Logo />
            </div>
            <span>Cartify</span>
          </div>
        </div>

        <div className="nav-links">
          <button className="text-link" onClick={() => { setSearchTerm(''); onSelectCategory(null); setView('shop'); }}>Categories</button>
        </div>
        
        <div className="search-container">
          <span className="search-icon"><Icons.Search /></span>
          <input 
            type="text" 
            placeholder="Search for products, brands and more..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (view !== 'shop') setView('shop');
            }}
          />
        </div>

        <div className="nav-actions">
          <button className="nav-btn" title="Cart" onClick={() => setView('cart')}>
            <Icons.Cart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button className="nav-btn profile-btn" title="Account" onClick={() => setView(currentUser ? 'profile' : 'signin')}>
            <Icons.Profile />
            {currentUser && <span className="user-name-label">{currentUser.name.split(' ')[0]}</span>}
          </button>
        </div>
      </nav>

      {/* Conditional Content */}
      {view === 'home' ? (
        <header className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Shop the Future of Commerce.</h1>
            <p className="hero-subtitle">
              Experience the most seamless shopping experience with Cartify. 
              Curated collections, lightning-fast delivery, and premium quality.
            </p>
            <button className="hero-btn" onClick={() => { setSearchTerm(''); onStartShopping(); }}>Start Shopping</button>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200" 
              alt="Premium Headphones" 
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=1200";
              }}
            />
          </div>
        </header>
      ) : view === 'shop' ? (
        <ShopPage 
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          onSelectProduct={onSelectProduct}
          onAddToCart={onAddToCart}
          searchTerm={searchTerm}
        />
      ) : view === 'details' ? (
        <ProductDetails 
          product={selectedProduct} 
          onBack={onBackToHome} 
          onNavigateShop={onStartShopping}
          onNavigateCategory={(cat) => onSelectCategory(cat.toLowerCase())}
          onAddToCart={onAddToCart} 
        />
      ) : view === 'cart' ? (
        <CartPage 
          cart={cart}
          onRemove={onRemoveFromCart}
          onUpdateQuantity={onUpdateCartQuantity}
          onContinueShopping={() => setView('shop')}
          onCheckout={() => setView(currentUser ? 'checkout' : 'signin')}
        />
      ) : view === 'profile' ? (
        <ProfilePage 
          user={currentUser} 
          favorites={favorites} 
          orders={orders}
          products={products}
          onSignOut={onSignOut}
          onSelectProduct={onSelectProduct}
          onBackToShop={() => setView('shop')}
        />
      ) : view === 'checkout' ? (
        <CheckoutPage 
          cart={cart}
          user={currentUser}
          onBackToCart={() => setView('cart')}
        />
      ) : (
        <div className="auth-container">
          {view === 'signin' ? (
            <SignInForm onSwitch={() => setView('signup')} onLogin={onLogin} />
          ) : (
            <SignUpForm onSwitch={() => setView('signin')} onLogin={onLogin} />
          )}
        </div>
      )}

      <footer style={{ padding: '60px 40px', color: '#6b6b8a', fontSize: '14px', width: '100%', textAlign: 'center' }}>
        © 2026 Cartify. All rights reserved.
      </footer>
    </div>
  );
};

export default CartifyHome;
