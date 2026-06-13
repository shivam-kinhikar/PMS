import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // console.log("Connecting to MongoDB...");
    // console.log(process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected!");
    // console.log(conn.connection.host);
  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error.name);
    console.error(error.message);
    console.error(error);

    process.exit(1);
  }
};

export default connectDB;