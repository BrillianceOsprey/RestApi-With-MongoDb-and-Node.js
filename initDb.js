
const mongoose = require('mongoose')
module.exports = () => {
     // mongodb+srv://Clint:<password>@cluster0.6lcepwd.mongodb.net/?retryWrites=true&w=majority
//clint
// unA7tnWn2Q5wUOOp
mongoose
.connect(
    process.env.MONGODB,
    {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass:process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
}).then(()=> {
    console.log('Mongodbd connected....')
}).catch(err => console.log(err.message));


mongoose.connection.on('connected', () => {
     console.log("Mongoose connected to db...");
})

//events
mongoose.connection.on('error',(err) => {
     console.log(err.message)
})

mongoose.connection.on('disconnected',(err) => {
     console.log("Mongoose connection is disconnected...")
})

process.on('SIGINT', () => {
    // mongoose.connection.close(()=> {
    // });
    console.log(
       "Mongoose connnection is disconnectd due to app termination..."
    );
        process.exit(0);
})
}