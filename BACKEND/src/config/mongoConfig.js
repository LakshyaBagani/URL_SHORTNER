import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://lakshyabagani658:Lakshya2006@url-shortner.7mj3apb.mongodb.net/shortURL");
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connectToDB;
