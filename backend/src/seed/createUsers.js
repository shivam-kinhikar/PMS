import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "../models/user.js";

dotenv.config();

const createUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // Delete existing users
    await User.deleteMany();

    // Hash passwords
    const adminPassword = await bcrypt.hash("admin123", 10);
    const userPassword = await bcrypt.hash("user123", 10);

    // Create users
    await User.create([
      {
        username: "admin",
        password: adminPassword,
        role: "admin",
      },
      {
        username: "user",
        password: userPassword,
        role: "user",
      },
    ]);

    console.log("Users created successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createUsers();