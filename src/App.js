import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/navbar';
import Home from './components/home';
import Cart from './components/cart';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
      cartItems: []
    };
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount() {
    this.getMenuItems();
  }

  async getMenuItems() {
    try {
      const response = await axios.get('http://localhost:5001/api/menu');
      this.setState({ menuItems: response.data });
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  }

  async addToCart(itemId) {
    const existingItem = this.state.cartItems.find(item => item.id === itemId);
    if (existingItem) {
      this.setState({
        cartItems: this.state.cartItems.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        )
      });
    } else {
      try {
        const response = await axios.post('http://localhost:5001/api/cart', { itemId });
        this.setState({ cartItems: [...this.state.cartItems, { ...response.data, quantity: 1 }] });
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  }

  removeFromCart(itemId) {
    this.setState({ cartItems: this.state.cartItems.filter(item => item.id !== itemId) });
  }

  updateQuantity(itemId, increment) {
    this.setState({
      cartItems: this.state.cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + increment } : item
      ).filter(item => item.quantity > 0)
    });
  }

  async placeOrder() {
    try {
      await axios.post('http://localhost:5001/api/order');
      this.setState({ cartItems: [] });
      alert('Order placed successfully');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  }

  render() {
    return (
      <Router>
        <NavbarComponent />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home menuItems={this.state.menuItems} cartItems={this.state.cartItems} addToCart={this.addToCart} />} />
            <Route path="/cart" element={<Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} updateQuantity={this.updateQuantity} placeOrder={this.placeOrder} />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
