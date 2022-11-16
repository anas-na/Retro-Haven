// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const usersController = require("./Controllers/usersController");
const categoriesController = require("./Controllers/categoriesController");
const itemsController = require("./Controllers/itemsController");
const messagesController = require("./Controllers/messagesController");
const stripe = require("stripe")(
  "sk_test_51JTu2IHSic55neYrNBT2tDxQdouyAgR5rMl2DOq0S6807T9v4gIVoAtb3E7l4ucN02QIqFmwPu001ZzLWvm1t12J00xG8Y0gSl"
);
// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/users", usersController);
app.use("/categories", categoriesController);
app.use("/items", itemsController);
app.use("/messages", messagesController);

// ROUTES
app.get("/", (req, res) => {
  res.send("RetroHaven Landing");
});
app.post("/pay", async (req, res) => {
  try {
    let intent = await stripe.paymentIntents.create({
      payment_method: req.body.payment_method_id,
      // description: res.body.description,
      amount: req.body.price * 100,
      currency: "USD",
      confirmation_method: "manual",
      confirm: true
    });
    res.send(generateResponse(intent));
  } catch (e) {
    return res.send({ error: e.message });
  }
});

const generateResponse = intent => {
  if (intent.status === "succeeded") {
    return {
      success: true
    };
  } else {
    return {
      error: "Invalid PaymentIntent status"
    };
  }
};

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found!!!");
});

module.exports = app;
