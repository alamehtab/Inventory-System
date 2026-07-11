const { body } = require("express-validator");

const kafkaEventValidator = [
    body("product_id")
        .notEmpty()
        .withMessage("Product ID is required"),
    body("event_type")
        .isIn(["purchase", "sale"])
        .withMessage("Event type must be purchase or sale"),
    body("quantity")
        .isInt({ min: 1 })
        .withMessage("Quantity must be greater than 0"),
    body("unit_price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Unit price must be positive")
];

module.exports = {
    kafkaEventValidator
};