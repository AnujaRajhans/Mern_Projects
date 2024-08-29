const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
PORT= 4000;
const userRouter= require('./routes/userRoute.js');
const categoryRouter= require('./routes/categoryRoute.js');
const productRouter= require('./routes/productRoute.js');
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://0.0.0.0:27017/Ecommerce");
mongoose.connection.once("open",()=>{
    console.log("Connected to MongoDB");
})
app.use("/api/users",userRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
