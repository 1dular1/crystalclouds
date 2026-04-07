require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/order", async (req, res) => {
  const { product, quantity, payment } = req.body;

  try {
    await axios.post(process.env.BOT_URL + "/create-order", {
      product,
      quantity,
      payment
    });

    res.send({ status: "ok" });
  } catch (err) {
    res.status(500).send({ error: "Błąd" });
  }
});

app.listen(3000, () => console.log("CrystalClouds backend działa"));
