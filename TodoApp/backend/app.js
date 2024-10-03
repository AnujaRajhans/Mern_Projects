const express = require ( 'express' );
const cors = require ( 'cors' );
const mongoose = require ( 'mongoose' );
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");
const categoryRoute = require("./routes/categoryRoute");
const inviteRoute = require("./routes/inviteRoute");
const priorityRoute= require("./routes/priorityRoute");
const imageRoute = require("./routes/imageRoute");
const app = express();
PORT= 7001;
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://0.0.0.0:27017/TodoApp");
const database = mongoose.connection;
database.on("error", (error) => {
  console.log("Error", error);
});
database.once("connected", () => {
    console.log("Database Connected");
});
app.use("/api/user", userRoute);
app.use("/api/task", taskRoute);
app.use("/api/category", categoryRoute);
app.use("/api/priority", priorityRoute); 
app.use("/api/invite", inviteRoute); 
app.use("/api/image", imageRoute);

app.use("/uploads", express.static("uploads"));
app.listen(7001,()=>{
    console.log("Server is running");
});


