const Joi = require("joi");
const { Shop, validate } = require('../models/shop');
const bcrypt = require("bcrypt");
const router = require('express').Router();

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const existingShop = await Shop.findOne({ email: req.body.email });
        if (existingShop) {
            return res.status(409).send({ message: "Shop with given email already exists" });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new shop document
        const newShop = new Shop({
            ...req.body,
            password: hashedPassword
        });

        // Save the new shop document
        await newShop.save();

        // Store the shop _id in the session
        req.session.shopId = newShop._id;

        res.status(201).send({ message: "Shop created successfully", shopId: newShop._id });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

module.exports = router;
