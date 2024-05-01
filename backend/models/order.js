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
  items: [
    {
      productName: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
  customerId: {
    type: String,
    required: true
  },
  orderStatus: {
    type: String,
    enum: ['processing', 'shipped', 'delivered'],
    default: 'processing'
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
