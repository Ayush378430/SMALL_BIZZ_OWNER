const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop', // Reference to the Shop model
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

// Validation function for product
const validateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label('Product Name'),
    price: Joi.number().required().label('Price'),
    shopId: Joi.string().required().label('Shop ID') // Validate shopId
  });
  return schema.validate(data);
};

module.exports = {
  Product,
  validateProduct
};
