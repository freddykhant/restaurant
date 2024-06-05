import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/navbar';
import Home from './components/home';
import Cart from './components/cart';
import axios from 'axios';
import './App.css';

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/menu')
      .then(response => setMenuItems(response.data))
      .catch(error => console.error('Error fetching menu:', error));
  }, []);

  const addToCart = (itemId) => {
    axios.post('http://localhost:5001/api/cart', { itemId })
      .then(response => setCartItems([...cartItems, response.data]))
      .catch(error => console.error('Error adding to cart:', error));
  };

  const removeFromCart = (itemId) => {
    axios.delete(`http://localhost:5001/api/cart/${itemId}`)
      .then(response => setCartItems(cartItems.filter(item => item.id !== itemId)))
      .catch(error => console.error('Error removing from cart:', error));
  };

  const placeOrder = () => {
    axios.post('http://localhost:5001/api/order')
      .then(response => setCartItems([]))
      .catch(error => console.error('Error placing order:', error));
  };

  return (
    <Router>
      <NavbarComponent />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home menuItems={menuItems} cartItems={cartItems} addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} placeOrder={placeOrder} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
