const express = require ( 'express' );
const cors = require ( 'cors' );
const mongoose = require ( 'mongoose' );
const userRoute= require ('./routes/userRoutes');
const electionRoute = require ('./routes/electionRoutes');
const candidateRoute = require ('./routes/candidateRoutes');
const voteRoute = require ('./routes/voteRoutes');
const app = express();
PORT= 6001;
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://0.0.0.0:27017/VotingApp");
const database = mongoose.connection;
database.on("error", (error) => {
  console.log("Error", error);
});
database.once("connected", () => {
    console.log("Database Connected");
});
app.use('/api/user',userRoute);
app.use('/api/elections',electionRoute);
app.use('/api/candidates',candidateRoute);
app.use ('/api/votes',voteRoute)
app.use("/uploads", express.static("uploads"));
app.listen(6001,()=>{
    console.log("Server is running");
});

