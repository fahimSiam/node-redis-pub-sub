const express = require("express");
const redis = require("redis");

const app = express();
const port = 3001;

const publisher = redis.createClient({
  socket: {
    port: 6379,
    host: "172.20.0.68",
  },
});
(async () => {
  await publisher.connect();
})();
app.get("/", (req, res) => {
  res.send("Hello producer!");
});

app.get("/publish", async (req, res) => {
  try {
    await publisher.connect();
    const id = Math.floor(Math.random() * 11);
    const product = {
      id: id,
      name: "Product " + id,
    };
    publisher.publish("product", JSON.stringify(product));
    res.send("product published!");
  } catch (e) {
    console.log(e);
    throw e;
  }
});

app.listen(port, () => {
  console.log(`producer app listening on port ${port}`);
});
