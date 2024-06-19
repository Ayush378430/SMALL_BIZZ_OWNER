const { Shop } = require('../models/shop');
const Promotion = require('../models/promotion');

// Controller to get shop details along with promotions
const getShopDetails = async (req, res) => {
  try {
    const shop = await Shop.findById(req.user._id).select('-password');
    if (!shop) return res.status(404).send('Shop not found');

    const promotions = await Promotion.find({ shopId: shop._id }).select('title');

    res.send({ shop, promotions });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

module.exports = { getShopDetails };
