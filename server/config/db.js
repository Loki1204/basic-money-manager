import mongoose from "mongoose";

// Connecting to the Mongo database
const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${db.connection.host}`.cyan.underline.bold);
  } catch (error) {
    console.log(`Error ${error.message}`.red);
    process.exit(1);
  }
};

export default connectDB;
