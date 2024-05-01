const express = require('express');
const Order= require('../models/order');
const router = express.Router();
const Joi = require('joi');
const axios = require('axios');

const orderSchema = Joi.object({
  orderId: Joi.string().required(),
  orderDate: Joi.date().required(),
  productName: Joi.string().required(),
  productId: Joi.string().required(),
  quantity: Joi.number().required(),
  shopId: Joi.string().required(),
  customerId: Joi.string().required(),
  orderStatus: Joi.string().required()
});

router.get('/', async (req, res) => {
  try{
    // here I am getting the shop id
    const response = await axios.get('http://localhost:8000/api/auth/shopId'); 
    console.log(response.data.ses);
    shopId=response.data.ses;
    // Query the database for products associated with the current shop id
    const orders = await Order.find({ shopId });
        res.status(200).json(orders);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})
module.exports = router;

