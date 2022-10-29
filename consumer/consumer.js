const express = require("express");
const redis = require("redis");

const app = express();
const port = 3000;

const consumer = redis.createClient();
//consumer.connect();
const products = [];

consumer.on("message", (channel, message) => {
  console.log("message", message);
  products.push(JSON.parse(message));
});
consumer.subscribe("products");
app.get("/", (req, res) => {
  res.send("Hello consumer!");
});
app.get("/consume", async (req, res) => {
  //await consumer.connect();
  console.log("products", products);
  res.status(200).json({ products });
});

app.listen(port, () => {
  console.log(`consumer app listening on port ${port}`);
});

//sudo service redis-server start
