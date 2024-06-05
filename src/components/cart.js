import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';

class Cart extends Component {
  render() {
    const { cartItems, removeFromCart, updateQuantity, placeOrder } = this.props;
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <Button variant="outline-primary" onClick={() => updateQuantity(item.id, -1)}>-</Button>
                  {' '}{item.quantity}{' '}
                  <Button variant="outline-primary" onClick={() => updateQuantity(item.id, 1)}>+</Button>
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <Button variant="danger" onClick={() => removeFromCart(item.id)}>Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <Button variant="success" onClick={placeOrder}>Order</Button>
      </div>
    );
  }
}

export default Cart;
