import React, { useState, useEffect } from 'react';
import CartifyHome from './pages/CartifyHome';

function App() {
  const [view, setView] = useState('home'); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [favorites, setFavorites] = useState([1, 3, 4]);
  const [products, setProducts] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // --- Persistence: Load on mount ---
  useEffect(() => {
    const initApp = async () => {
      // 0. Fetch Products
      try {
        const prodRes = await fetch('http://localhost:5000/api/products');
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          setProducts(prodData);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }

      const token = localStorage.getItem('token');
      const savedGuestCart = localStorage.getItem('guestCart');
      
      // 1. Restore guest cart first
      if (savedGuestCart) {
        setCart(JSON.parse(savedGuestCart));
      }

      // 2. Restore user session if token exists
      if (token) {
        try {
          const userRes = await fetch('http://localhost:5000/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (userRes.ok) {
            const userData = await userRes.json();
            setCurrentUser(userData);
            
            // 3. Fetch backend cart for user
            const cartRes = await fetch('http://localhost:5000/api/cart', {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            if (cartRes.ok) {
              const backendCart = await cartRes.json();
              if (backendCart.length > 0) {
                setCart(backendCart);
              }
            }
          } else {
            localStorage.removeItem('token');
          }
        } catch (err) {
          console.error('Initialization error:', err);
        }
      }
      setIsInitialized(true);
    };

    initApp();
  }, []);

  // --- Persistence: Sync on changes ---
  useEffect(() => {
    if (!isInitialized) return;

    const syncData = async () => {
      if (currentUser) {
        // Sync to backend
        const token = localStorage.getItem('token');
        try {
          await fetch('http://localhost:5000/api/cart/sync', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ items: cart })
          });
        } catch (err) {
          console.error('Cart sync error:', err);
        }
      } else {
        // Sync to localStorage for guests
        localStorage.setItem('guestCart', JSON.stringify(cart));
      }
    };

    syncData();
  }, [cart, currentUser, isInitialized]);

  // --- Navigation Handlers ---
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setView('details');
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setView('shop');
  };

  const handleBackToHome = () => {
    setSelectedProduct(null);
    setSelectedCategory(null);
    setView('home');
  };

  const handleStartShopping = () => {
    setSelectedCategory(null);
    setView('shop');
  };

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setSelectedCategory(null);
    setView('shop');
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('guestCart');
    setCurrentUser(null);
    setCart([]);
    setView('home');
  };

  // --- Cart Logic ---
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const productId = product.id;
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, delta) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  if (!isInitialized) return null; // Or a loader

  return (
    <div className="app">
      <CartifyHome 
        view={view} 
        setView={setView}
        selectedProduct={selectedProduct}
        selectedCategory={selectedCategory}
        cart={cart}
        currentUser={currentUser}
        favorites={favorites}
        products={products}
        onSelectProduct={handleSelectProduct}
        onSelectCategory={handleSelectCategory}
        onBackToHome={handleBackToHome}
        onStartShopping={handleStartShopping}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
        onUpdateCartQuantity={updateCartQuantity}
        onLogin={handleLogin}
        onSignOut={handleSignOut}
        onToggleFavorite={(id) => setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])}
      />
    </div>
  );
}

export default App;
