import mongoose, { ConnectOptions } from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log(`MongoDB Connected': ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error is ${error}`);
    process.exit(1); // Exit with a non-zero status code to indicate an error
  }
};

export default connectDB;
