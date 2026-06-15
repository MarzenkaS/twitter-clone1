import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        const conn = await mongoose.connect()
        console.log("Connected to the database");
        return conn;
    } catch (error) {
        console.error(`Error: ${error.message}`);

    }
};

export default connectDB;
