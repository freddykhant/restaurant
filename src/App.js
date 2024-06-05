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
    const existingItem = cartItems.find(item => item.id === itemId);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      axios.post('http://localhost:5001/api/cart', { itemId })
        .then(response => setCartItems([...cartItems, { ...response.data, quantity: 1 }]))
        .catch(error => console.error('Error adding to cart:', error));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, increment) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + increment } : item
    ).filter(item => item.quantity > 0));
  };

  const placeOrder = () => {
    axios.post('http://localhost:5001/api/order')
      .then(response => {
        setCartItems([]);
        alert('Order placed successfully');
      })
      .catch(error => console.error('Error placing order:', error));
  };

  return (
    <Router>
      <NavbarComponent />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home menuItems={menuItems} cartItems={cartItems} addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} placeOrder={placeOrder} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
