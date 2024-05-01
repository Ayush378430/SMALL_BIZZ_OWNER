const express = require('express');
const Buynow= require('../models/order');
const router = express.Router();
const axios = require('axios');



router.get('/', async (req, res) => {
  try{
    // here I am getting the shop id
    const response = await axios.get('http://localhost:8000/api/auth/shopId'); 
    
    shopId=response.data.ses;
    // Query the database for products associated with the current shop id
    const orders = await Buynow.find({ shopId: shopId});
   
        res.status(200).json(orders);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})
module.exports = router;

