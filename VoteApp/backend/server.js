const express = require ( 'express' );
const cors = require ( 'cors' );
const mongoose = require ( 'mongoose' );
const app = express();
const userRoute = require ('./routes/authRoutes');
PORT= 6001;
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://0.0.0.0:27017/VoteApp");
const database = mongoose.connection;
database.on("error", (error) => {
  console.log("Error", error);
});
database.once("connected", () => {
    console.log("Database Connected");
});
app.use("/",userRoute);
app.use("/uploads", express.static("uploads"));
app.listen(6001,()=>{
    console.log("Server is running");
});