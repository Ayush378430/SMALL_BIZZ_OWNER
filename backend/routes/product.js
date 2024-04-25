const router = require('express').Router();
const { Product } = require('../models/product');
const Joi = require('joi');

router.post('/', async (req, res) => {
    try {
        // Validate the request body
        const { error } = validateProduct(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
       
        // Create the product
        const product = await new Product({
            name: req.body.name,
            price: req.body.price,
            shopId: req.body.shopId // Associate the product with the shop
        }).save();

        res.status(201).send({ message: 'Product created successfully', data: product });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Validation function for product
const validateProduct = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label('Product Name'),
        price: Joi.number().required().label('Price'),
        shopId: Joi.string().required().label('Shop ID') // Validate shopId
    });
    return schema.validate(data);
};

module.exports = router;
