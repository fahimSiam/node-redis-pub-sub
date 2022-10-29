const express = require("express");
const redis = require("redis");

const app = express();
const port = 3001;

const publisher = redis.createClient();
(async () => {
  await publisher.connect();
  console.log("redis connected");
})();
app.get("/", (req, res) => {
  res.send("Hello producer!");
});

app.get("/publish", async (req, res) => {
  try {
    const id = Math.floor(Math.random() * 11);
    const product = {
      id: id,
      name: "Product " + id,
    };
    console.log("product", product);
    publisher.publish("products", JSON.stringify(product));
    res.send("product published!");
  } catch (e) {
    console.log(e);
    throw e;
  }
});

app.listen(port, () => {
  console.log(`producer app listening on port ${port}`);
});
