const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

/* The Sushi 2016 Lunch Menu
   Source: https://www.ubereats.com/au/store/the-sushi-2016-rivervale/RwzJd74wTVqwUItFcnqU6g?ps=1
*/

let menuItems = [
  { id: 1, name: "Chicken Avocado Nigiri", price: 3.50, description: "Four pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/b5416336-4779-41eb-b798-87640d8185a2.jpeg" },
  { id: 2, name: "Salmon Avocado Nigiri", price: 3.50, description: "Four pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/ce5cd03a-665f-4754-bd82-39f44bfbf5ae.jpeg" },
  { id: 3, name: "Spicy Salmon Nigiri", price: 3.50, description: "Four pieces. Spicy.", imageUrl: "https://d1ralsognjng37.cloudfront.net/4fcf7980-41b8-432e-b061-d6487617f725.jpeg" },
  { id: 4, name: "Prawn Tempura Nigiri", price: 3.50, description: "Four pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/45128d1f-7690-4c91-8a8e-a01ad987b16a.jpeg" },
  { id: 5, name: "Scallop Nigiri", price: 3.50, description: "Four pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/0b0229e6-0b08-43b5-924b-fbf460f2d6dd.jpeg" },
  { id: 6, name: "Cooked Prawn Nigiri", price: 3.50, description: "Four pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/e21e3833-31b5-44a9-a2b0-413da4a3e43f.jpeg" },
  { id: 7, name: "Panko Prawn Nigiri", price: 3.50, description: "Four pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/5fd3f2f2-b95d-4f1e-a158-80819e5c77da.jpeg" },
  { id: 8, name: "Inari", price: 3.50, description: "Four pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/9838d8bf-a3de-4195-a40c-0a1f06e250ae.jpeg" },
  { id: 9, name: "Salmon Nigiri", price: 3.50, description: "Four pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/bfb14132-1b42-4d6b-af73-c884d5646461.jpeg" },
  { id: 10, name: "Tuna Nigiri", price: 3.50, description: "Four pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/798f33fd-95f3-4a5c-b837-dfd42581a89c.jpeg" },
  { id: 11, name: "Salmon Toro Nigiri", price: 3.50, description: "Four pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/64a48afc-53dd-401f-87c3-234d5b3af699.jpeg" },
  { id: 12, name: "Egg Nigiri", price: 3.50, description: "Four pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/4e049652-2e0e-474e-b9db-8fbe7a83c8c2.jpeg" },
  { id: 13, name: "Squid Nigiri", price: 3.50, description: "Four pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/2667e4eb-5e96-4505-a208-9e8b85edad75.jpeg" },
  { id: 14, name: "Vegetable Tempura Nigiri", price: 3.50, description: "Four pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/ae23943e-664e-4064-92bb-d5bd96b7c198.jpeg" },
  { id: 15, name: "Aburi Spicy Salmon", price: 3.50, description: "Four pieces. Spicy.", imageUrl: "https://d1ralsognjng37.cloudfront.net/cc17e173-31a4-454e-a1cc-c5bf216b4ea7.jpeg" },
  { id: 16, name: "Aburi Wagyu", price: 3.50, description: "Four pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/f0fb6242-836c-4665-8ad4-a1877f621811.jpeg" },
  { id: 17, name: "Aburi Tuna", price: 3.50, description: "Four pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/cfa744bf-ba37-47d1-b71b-fcce0bccc8bc.jpeg" },
  { id: 18, name: "Aburi Eel", price: 3.50, description: "Four pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/c356b9ae-3c97-465d-bf5b-ede5911dcb3f.jpeg" },
  { id: 19, name: "Aburi Pork", price: 3.50, description: "Four pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/1b58ae72-b5fc-4a2a-bb5c-b4852be2acdd.jpeg" },
  { id: 20, name: "Aburi Salmon", price: 3.50, description: "Four pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/81d33cad-f4a8-4501-b6df-84cb0d9dac50.jpeg" },
  { id: 21, name: "Aburi Scallop", price: 3.50, description: "Four pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/72db4a21-c4cd-4a31-a393-0c3e5eab3e31.jpeg" },
  { id: 22, name: "Leo Roll", price: 3.50, description: "Six pieces.", imageUrl: "	https://d1ralsognjng37.cloudfront.net/d44671aa-e889-4579-b731-f510e54bb6b1.jpeg" },
  { id: 23, name: "Crunch Roll", price: 3.50, description: "Six pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/d4010c3f-29c8-4f11-a5ef-1ce165f1e394.jpeg" },
  { id: 24, name: "Teriyaki Chicken Small Roll", price: 3.50, description: "Eight pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/ab48eb28-f648-470a-a7f8-0bf5c0a138ea.jpeg" },
  { id: 25, name: "Salmon Avocado Small Roll", price: 3.50, description: "Eight pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/2a032c35-3ddd-4070-bcf9-414a19e7097b.jpeg" },
  { id: 26, name: "Tuna Salad Avocado Small Roll", price: 3.50, description: "Six pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/25565f10-9aeb-43da-a125-5ed127350744.jpeg" },
  { id: 27, name: "Chicken Katsu Avocado Small Roll", price: 3.50, description: "Eight pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/5e0b7b85-46d5-4ec1-b6dd-b9b077485f37.jpeg" },
  { id: 28, name: "Veg Tempura Avocado Small Roll", price: 3.50, description: "Six pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/6438091d-b318-4111-986d-f53d614b7eb1.jpeg" },
  { id: 29, name: "Spicy Chicken Small Roll", price: 3.50, description: "Six pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/814e983b-bf12-4af1-837a-65658d113a45.jpeg" },
  { id: 30, name: "Teriyaki Chicken Baby Roll", price: 3.50, description: "Twelve pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/d96f9f9b-d9fa-4c72-8f1e-3fa2d75f3b66.jpeg" },
  { id: 31, name: "Tuna Salad Baby Roll", price: 3.50, description: "Twelve pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/fc11b2f8-bed0-4293-ae8f-3408ad6dca51.jpeg" },
  { id: 32, name: "Avocado Baby Roll", price: 3.50, description: "Twelve pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/e171c3f4-e0cb-44cf-9ec7-a584954ed486.jpeg" },
  { id: 33, name: "Cucumber Baby Roll", price: 3.50, description: "Twelve pieces.", imageUrl: "https://d1ralsognjng37.cloudfront.net/ba761935-0b53-487d-8e12-83f1c6eb95d0.jpeg" },
  { id: 34, name: "Tantan Ramen", price: 15.50, description: "Delicious ramen with a rich, spicy broth.", imageUrl: "https://tb-static.uber.com/prod/image-proc/processed_images/9f7872132a62f178395a5e1c72f8bec4/a19bb09692310dfd41e49a96c424b3a6.jpeg" },
  { id: 35, name: "Shio Ramen", price: 15.50, description: "A clear, salty broth with noodles and toppings.", imageUrl: "https://tb-static.uber.com/prod/image-proc/processed_images/7148f9da60579d29c3c9c965471268ca/a19bb09692310dfd41e49a96c424b3a6.jpeg" },
  { id: 36, name: "Beef Yaki Udon", price: 15.50, description: "Stir-fried udon noodles with beef and vegetables.", imageUrl: "https://d1ralsognjng37.cloudfront.net/ef66f667-fb92-451a-b730-390a2da5b5a3.jpeg" },
  { id: 37, name: "Plain Udon", price: 12.50, description: "Udon noodles in a simple broth.", imageUrl: "https://tb-static.uber.com/prod/image-proc/processed_images/22bacfd6a98fc10c253da313a1c13cf5/a19bb09692310dfd41e49a96c424b3a6.jpeg" },
  { id: 38, name: "Vegetable Yaki Udon", price: 13.50, description: "Stir-fried udon noodles with vegetables.", imageUrl: "https://d1ralsognjng37.cloudfront.net/c27246c1-9401-484c-aaff-f10a3241d8e2.jpeg " },
  { id: 39, name: "Teriyaki Beef Udon", price: 15.50, description: "Udon noodles with teriyaki beef.", imageUrl: "https://tb-static.uber.com/prod/image-proc/processed_images/0ef301a833926219ae888d3048a2b2f2/a19bb09692310dfd41e49a96c424b3a6.jpeg" },
  { id: 40, name: "Karaage Udon", price: 14.50, description: "Udon noodles with crispy karaage chicken.", imageUrl: "https://tb-static.uber.com/prod/image-proc/processed_images/36f02f279e88a1fa32fa87a6bb8b204e/a19bb09692310dfd41e49a96c424b3a6.jpeg" },
  { id: 41, name: "Spicy Pork Yaki Ramen", price: 15.50, description: "Spicy stir-fried ramen with pork.", imageUrl: "https://d1ralsognjng37.cloudfront.net/ef66f667-fb92-451a-b730-390a2da5b5a3.jpeg" },
  { id: 42, name: "Shoyu Ramen", price: 15.50, description: "Soy sauce-flavored ramen.", imageUrl: "https://tb-static.uber.com/prod/image-proc/processed_images/a4381cfedea65512b2e37aabbf67957e/a19bb09692310dfd41e49a96c424b3a6.jpeg" },
  { id: 43, name: "Half Udon", price: 7.50, description: "Half serving of udon noodles.", imageUrl: "https://d1ralsognjng37.cloudfront.net/977097db-ab77-4e25-bcba-233d225ccfd2.jpeg" },
  { id: 44, name: "Teriyaki Chicken Don", price: 13.50, description: "Rice bowl with teriyaki chicken.", imageUrl: "https://d1ralsognjng37.cloudfront.net/bf731355-c6f6-4f96-8af7-7b5d7a92e7d2.jpeg" },
  { id: 45, name: "Karaage Don", price: 13.50, description: "Rice bowl with karaage chicken.", imageUrl: "https://tb-static.uber.com/prod/image-proc/processed_images/33ec26bbdd2bba61b083d613c3fb1cd9/a19bb09692310dfd41e49a96c424b3a6.jpeg" },
  { id: 46, name: "Teriyaki Beef Don", price: 13.50, description: "Rice bowl with teriyaki beef.", imageUrl: "https://tb-static.uber.com/prod/image-proc/processed_images/73f05b2b90519adeea716bb7bf018728/a19bb09692310dfd41e49a96c424b3a6.jpeg" },
  { id: 47, name: "Curry Chicken Don", price: 13.50, description: "Chicken with curry on rice.", imageUrl: "https://tb-static.uber.com/prod/image-proc/processed_images/638534efc580acea9b02d51e4f1f07a1/a19bb09692310dfd41e49a96c424b3a6.jpeg" }
];

let orders = [];

// Route to get menu items
app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

// Route to add item to cart
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

// Route to remove item from cart
app.delete('/api/cart/:id', (req, res) => {
  const { id } = req.params;
  orders = orders.filter(item => item.id !== parseInt(id));
  res.send({ message: "Item removed" });
});

// Route to place order
app.post('/api/order', (req, res) => {
  orders = [];
  res.send({ message: "Order placed successfully" });
});

// Start server
const PORT = 5001; // Changed port from 5000 to 5001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
