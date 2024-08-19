const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
PORT= 3000;
const userRouter= require('./routes/userRoute.js');
const categoryRouter= require('./routes/categoryRoute.js');
const productRouter= require('./routes/productRoute.js');
app.use(express.json());
mongoose.connect("mongodb://0.0.0.0:27017/Ecommerce");
mongoose.connection.once("open",()=>{
    console.log("Connected to MongoDB");
})
app.use("/api", userRouter)
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
