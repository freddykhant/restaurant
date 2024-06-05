import React from 'react';
import { Card, Button } from 'react-bootstrap';

function Home({ menuItems, cartItems, addToCart }) {
  return (
    <div className="row">
      {menuItems.map(item => {
        const isInCart = cartItems.some(cartItem => cartItem.id === item.id);
        return (
          <div className="col-md-4" key={item.id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>${item.price}</Card.Text>
                <Button
                  variant={isInCart ? "secondary" : "primary"}
                  onClick={() => addToCart(item.id)}
                  disabled={isInCart}
                >
                  {isInCart ? "In Cart" : "Add to Cart"}
                </Button>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
