const { Router } = require("express");
const User = require("../../models/User");
const paymentRoute = Router();
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MERCADOPAGO,
});

paymentRoute.post("/", (req, res) => {
  let preference = {
    items: [
      {
        title: `Licencia para ${req.body.username}`,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      success: "http://localhost:3000/user/ispaid",
      failure: "http://localhost:3000/login",
      pending: "http://localhost:3000/login",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

paymentRoute.post("/feedback/:id", async function (req, res) {
  const { id } = req.params;

  const company = await User.findById(id);

  try {
    if (company) {
      company.isPaid = true;
      company.save();
      res.status(200).json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = paymentRoute;
