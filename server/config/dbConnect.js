require("dotenv").config();
const mongoose = require("mongoose");

//CONNECT
const dbConnect = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    const URI = `${MONGO_URI}`;
    await mongoose.connect(URI);
    console.log("DB Connected Successfully...");
  } catch (error) {
    console.log(error.message);
    //exit the server
    process.exit(1);
  }
};

dbConnect();
