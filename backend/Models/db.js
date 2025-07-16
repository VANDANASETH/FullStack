const monggose = require("mongoose");

const mongo_url = process.env.MONGO_URI;

monggose.connect(mongo_url)
  .then(()=>{
    console.log("MongoDB Conncetd...");
  }).catch((err)=>{
    console.log("MongoDB Connection Error", err);
  })