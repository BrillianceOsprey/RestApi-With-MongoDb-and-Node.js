const createError = require('http-errors')
const mongoose = require('mongoose')
const Product = require('../Models/Product.model')
module.exports = {

    getAllProduct  :async(req,res,next)=> {
        //  res.send('getting a list of all product.....')
        try {
    // const results = await Product.find({},{name:1,price:1,_id:0})
    const results = await Product.find({},{name:1,price:1,_id:1});
    res.send(results)
        }catch (e) {
             console.log(e.message) 
        }
    },

    createNewProduct : async (req,res,next) => {
        // const product = new Product({
        //     name: req.body.name,
        //     price: req.body.price
        // })
        // product.save()
        // .then(result => {
        //      console.log(result);
        //      res.send(result);
        // }).catch(err => {
        //      console.log(err.message);
        // })
        try{
    
            const product = new Product(req.body)
            const result = await product.save()
            res.send(result)
        } catch (e) {
             console.log(e.message)
          if(e.name === 'ValidationError'){
            next(createError(422, e.message))
            return;
          }
          next(e)
        }
    },


    updateProduct : async (req,res,next)=>{
        const id = req.params.id
        const updates = req.body
        const options = {new: true}
        try {
            const result = await Product.findByIdAndUpdate(id,updates,options)
        if(!result){
            throw createError(404,"Product doesn't not exit")
        }
        res.send(result)
        } catch (e) {
             console.log(e.message)
             if(e instanceof mongoose.CastError) {
                 return next(createError(400,"invalid Product Id"))
             }
             next(e)
        }
    },

    deleteProduct : async (req,res,next)=>{

        const id = req.params.id
        try {
             const result = await Product.findByIdAndDelete(id)
             console.log(result)
    
             if(!result)
       {
        throw createError(404,"Product doesn't exit")
       }
             res.send(result)
             
        }
        catch (e) {
             console.log(e);
             if(e instanceof mongoose.CastError) {
                next(createError(400, "Invalid Product id"))
                return;
            }
            next(e)
        }
    },

    getProductById :async(req,res,next)=>{
        const id = req.params.id
        try {
    const product = await Product.findById(id)
    
    if(!product)
       {
        throw createError(404,"Product doesn't exit")
       }
    res.send(product)
        }
        catch (e){
            console.log(e.message)
            if(e instanceof mongoose.CastError) {
                next(createError(400, "Invalid Product id"))
                return;
            }
            next(e)
        }
    }

}