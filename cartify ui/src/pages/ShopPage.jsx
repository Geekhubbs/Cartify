import React, { useState } from 'react';
import '../styles/ShopPage.css';

const categories = [
  { id: 'electronics', name: 'Electronics', icon: '💻', color: '#DBEAFE', iconColor: '#2563EB' },
  { id: 'fashion', name: 'Fashion', icon: '👕', color: '#FCE7F3', iconColor: '#DB2777' },
  { id: 'home', name: 'Home & Living', icon: '🏠', color: '#DCFCE7', iconColor: '#16A34A' },
  { id: 'sports', name: 'Sports & Outdoors', icon: '⚽', color: '#FFEDD5', iconColor: '#EA580C' },
  { id: 'beauty', name: 'Beauty & Health', icon: '✨', color: '#F3E8FF', iconColor: '#9333EA' },
  { id: 'books', name: 'Books & Media', icon: '📚', color: '#FEF9C3', iconColor: '#CA8A04' },
];

const ShopPage = ({ products, selectedCategory, onSelectCategory, onSelectProduct, onAddToCart, searchTerm }) => {
  const [sortBy, setSortBy] = useState('popular');

  // Filtering Logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price_num - b.price_num;
    if (sortBy === 'price-high') return b.price_num - a.price_num;
    if (sortBy === 'newest') return b.id - a.id;
    return 0; // Default (popular)
  });

  return (
    <div className="shop-container">
      {/* Category Section */}
      <section className="shop-header">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          {categories.map(cat => (
            <div 
              key={cat.id} 
              className={`category-card ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id === selectedCategory ? null : cat.id)}
            >
              <div className="category-icon-wrap" style={{ backgroundColor: cat.color }}>
                <span>{cat.icon}</span>
              </div>
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Results Section */}
      <section className="results-section">
        <div className="results-header">
          <div className="results-title-group">
            <h3>
              {selectedCategory 
                ? (categories.find(c => c.id === selectedCategory.toLowerCase())?.name || 
                   categories.find(c => c.name.toLowerCase() === selectedCategory.toLowerCase())?.name || 
                   selectedCategory)
                : searchTerm ? `Search results for "${searchTerm}"` : 'All Products'}
            </h3>
            {selectedCategory && (
              <button className="clear-filter" onClick={() => onSelectCategory(null)}>
                Clear filter
              </button>
            )}
          </div>
          
          <div className="results-actions">
            <select 
              className="sort-dropdown" 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Sort by: Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        <div className="shop-product-grid">
          {sortedProducts.length > 0 ? (
            sortedProducts.map(product => (
              <div key={product.id} className="product-card" onClick={() => onSelectProduct(product)}>
                <div className="product-img">{product.icon}</div>
                <div className="product-info">
                  <p>{product.category}</p>
                  <h3>{product.name}</h3>
                  <div className="product-footer">
                    <span className="price">{product.price}</span>
                    <button className="add-btn" onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}>+</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '60px', color: '#6b6b8a' }}>
              <h3>No products found.</h3>
              <button onClick={() => { onSelectCategory(null); }} style={{ marginTop: '10px', color: '#4F46E5', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Show all products</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
