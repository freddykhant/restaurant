import React from 'react';
import { Card, Button } from 'react-bootstrap';

function Home({ menuItems, cartItems, addToCart }) {
  return (
    <div className="row">
      {menuItems.map(item => {
        const isInCart = cartItems.some(cartItem => cartItem.id === item.id);
        return (
          <div className="col-md-4" key={item.id}>
            <Card className="mb-4" style={{ display: 'flex', flexDirection: 'row' }}>
              <Card.Body style={{ flex: 1 }}>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>${item.price}</Card.Text>
                <Button
                  variant={isInCart ? "secondary" : "warning"}
                  onClick={() => addToCart(item.id)}
                  disabled={isInCart}
                >
                  {isInCart ? "In Cart" : "Add to Cart"}
                </Button>
              </Card.Body>
              <Card.Img variant="right" src={item.imageUrl} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
