import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✔️ MongoDB connected");
  } catch (err) {
    console.error("✖️ MongoDB connection error:", err);
    process.exit(1);
  }
};

export default ConnectDB;