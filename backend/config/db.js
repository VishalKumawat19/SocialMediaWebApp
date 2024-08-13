const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const mongoConnection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Connected to mongodb at host ${mongoConnection.connection.host}`
    );
  } catch (error) {
    console.log("Mongodb connection error", error);
  }
};

module.exports = connectDb;