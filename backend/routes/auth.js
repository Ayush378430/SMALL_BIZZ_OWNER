const router = require('express').Router();
const { Shop } = require('../models/shop');
const Joi = require("joi");
const bcrypt = require("bcrypt");

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const shop = await Shop.findOne({ email: req.body.email });
        if (!shop) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        const validPassword = await bcrypt.compare(req.body.password, shop.password);
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid email or password" });
        }

        // Assign shop _id to session upon successful login
        req.session.shopId = shop._id;

        const token = shop.generateAuthToken();
        res.status(200).send({ data: token, message: "Logged in successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;
