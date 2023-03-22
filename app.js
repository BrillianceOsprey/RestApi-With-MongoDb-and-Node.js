const express = require('express')
const createError = require('http-errors')
const app = express()
const dotenv = require('dotenv').config()

console.log(dotenv.parsed)
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Initailize db
require('./initDb')();


app.all('/test', (req,res) => {
    console.log(req.body)
    res.send(req.body)

})
const ProductRoute = require('./Routes/Product.route');
const { collection } = require('./Models/Product.model')
app.use('/products',ProductRoute);
     
// 404 handler and pass to error handler
app.use((req,res,next)=> {
    next(createError(404,'Not found'))
})
// error handler
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error: {
            status :err.status || 500,
            message: err.message,
        }
    })
})
const PORT = process.env.PORT || 3000
// error handling
app.listen(PORT, ()=> {
     console.log('I am running on port ' + PORT + '.....')
})