import React from 'react';
import { Card, Button } from 'react-bootstrap';

function Home({ menuItems, addToCart }) {
  return (
    <div className="row">
      {menuItems.map(item => (
        <div className="col-md-4" key={item.id}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <Card.Text>${item.price}</Card.Text>
              <Button variant="primary" onClick={() => addToCart(item.id)}>Add to Cart</Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default Home;
