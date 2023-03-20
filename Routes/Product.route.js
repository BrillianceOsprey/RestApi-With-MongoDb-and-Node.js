const express = require('express')
const router = express.Router();
// const Product = require('../Models/Product.model')
const Product = require('../Models/Product.model')

router.get('/', (req,res,next)=> {
    next(new Error('Cannot get a list of all products'))
     res.send('getting a list of all product.....')
})
// create a new product
router.post('/',(req,res,next) => {
    console.log(req.body)
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    })
    product.save()
    .then(result => {
         console.log(result);
         res.send(result);
    }).catch(err => {
         console.log(err.message);
    })
    res.send('product crated');
})
// get a product by id
router.get('/:id',(req,res,next)=>{
    res.send('getting a single product...')
})
// update a product by id
router.patch('/:id',(req,res,next)=>{
    res.send('updating a single product...')
})
// delete a product by id
router.delete('/:id',(req,res,next)=>{
    res.send('deleting a single product...')
}) 
module.exports = router;