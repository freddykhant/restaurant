const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Sample data for menu items and orders
let menuItems = [
  { id: 1, name: "Burger", price: 5.99, description: "Delicious beef burger" },
  { id: 2, name: "Pizza", price: 9.99, description: "Cheesy pizza with toppings" }
];

let orders = [];

// Route to get menu items
app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

// Route to add an item to the cart
app.post('/api/cart', (req, res) => {
  const { itemId } = req.body;
  const item = menuItems.find(item => item.id === itemId);
  if (item) {
    orders.push(item);
    res.status(201).send(item);
  } else {
    res.status(404).send({ message: "Item not found" });
  }
});

// Route to remove an item from the cart
app.delete('/api/cart/:id', (req, res) => {
  const { id } = req.params;
  orders = orders.filter(item => item.id !== parseInt(id));
  res.send({ message: "Item removed" });
});

// Route to place an order
app.post('/api/order', (req, res) => {
  orders = [];
  res.send({ message: "Order placed successfully" });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
