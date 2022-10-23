const express = require("express");
const redis = require("redis");

const app = express();
const port = 3000;

const consumer = redis.createClient({
  host: "127.0.0.1",
  no_ready_check: true,
});
const products = [];

consumer.on("message", (channel, message) => {
  products.push(JSON.parse(message));
});
consumer.subscribe("products");
app.get("/", (req, res) => {
  res.send("Hello consumer!");
});
app.get("/consume", async (req, res) => {
  await consumer.connect();
  res.status(200).json({ products });
});

app.listen(port, () => {
  console.log(`consumer app listening on port ${port}`);
});

//sudo service redis-server start
