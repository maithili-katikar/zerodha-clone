const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name must be at most 50 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).max(72).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password must be at most 72 characters",
    "any.required": "Password is required",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

const orderSchema = Joi.object({
  name: Joi.string().trim().uppercase().min(1).max(30).required().messages({
    "string.empty": "Stock name is required",
    "any.required": "Stock name is required",
  }),
  qty: Joi.number().integer().min(1).max(100000).required().messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be a whole number",
    "number.min": "Quantity must be at least 1",
    "number.max": "Quantity is too large",
    "any.required": "Quantity is required",
  }),
  price: Joi.number().greater(0).max(10000000).required().messages({
    "number.base": "Price must be a number",
    "number.greater": "Price must be above 0",
    "number.max": "Price is too large",
    "any.required": "Price is required",
  }),
  mode: Joi.string().valid("BUY", "SELL").required().messages({
    "any.only": "Order type must be BUY or SELL",
    "any.required": "Order type is required",
  }),
});

module.exports = { signupSchema, loginSchema, orderSchema };