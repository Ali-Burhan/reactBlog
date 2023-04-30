const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://AliBurhan:Burhan786@cluster0.pw4iktd.mongodb.net/test";

mongoose.connect(mongoURI).then(()=>{console.log("Connected");}).catch(()=>{console.log("Error occured");})