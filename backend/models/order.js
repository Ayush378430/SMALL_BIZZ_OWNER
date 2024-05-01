const mongoose = require('mongoose');

const buynowSchema = new mongoose.Schema({
productId: mongoose.Types.ObjectId,
    quantity: Number,
    shopId: mongoose.Types.ObjectId,
    orderId: String, // Add orderId
    orderDate: Date, // Add orderDate
    productName: String, // Add productName
    customerId: mongoose.Types.ObjectId, // Add customerId
    orderStatus: { type: String, default: 'pending' } // Add orderStatus with default value
  
});

const Buynow = mongoose.model('buynow', buynowSchema);

module.exports = Buynow;
