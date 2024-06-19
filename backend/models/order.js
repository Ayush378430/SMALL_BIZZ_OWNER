const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
     type: String,
    required: true,
    unique: true
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  productName: {
    type: String,
    required: true
  },
  productId: {
     type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },
  customerId: {
     type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  orderStatus: {
    type: String,
    enum: ['processing', 'shipped', 'delivered'],
    default: 'processing',
    required: true
  }
});

const Order = mongoose.model('buynow', orderSchema);

module.exports = Order;