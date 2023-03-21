const express = require('express')
const mongoose = require('mongoose')
const createError = require('http-errors')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// mongodb+srv://Clint:<password>@cluster0.6lcepwd.mongodb.net/?retryWrites=true&w=majority
//clint
// unA7tnWn2Q5wUOOp
mongoose
.connect(
    'mongodb+srv://cluster0.6lcepwd.mongodb.net/',
    {
    dbName: 'RestApi_Ms',
    user: 'Clint',
    pass:'unA7tnWn2Q5wUOOp',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
}).then(()=> {
    console.log('Mongodbd connected....')
})
app.all('/test', (req,res) => {
    //  console.log(req.params); 
    //  res.send(req.params);

    console.log(req.body)
    res.send(req.body)

})
const ProductRoute = require('./Routes/Product.route');
app.use('/products',ProductRoute);
     
// 404 handler and pass to error handler
app.use((req,res,next)=> {
    // const err = new Error("Not found")
    // err.status = 404
    // next(err);
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

// error handling
app.listen(3000, ()=> {
     console.log('I am running on port 3000....')
})