import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connectToDB;
