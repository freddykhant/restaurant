import React from 'react';
import { Table, Button } from 'react-bootstrap';

function Cart({ cartItems, removeFromCart, placeOrder }) {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.price}</td>
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

export default Cart;
