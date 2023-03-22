const express = require('express')       
const router = express.Router();
// const Product = require('../Models/Product.model')
// const createError = require('http-errors');
// const mongoose = require('mongoose')
const ProductController = require('../Controllers/Product.Controller')

// get a list of all product
router.get('/', ProductController.getAllProduct)

// create a new product
router.post('/', ProductController.createNewProduct)

// get a product by id
router.get('/:id', ProductController.getProductById)

// update a product by id
router.patch('/:id', ProductController.updateProduct)

// delete a product by id
router.delete('/:id', ProductController.deleteProduct) 

module.exports = router;