import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const connections = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.info("successfully connected to the DB");
    } catch (error) {
        console.error(error.message);
    }
};

connections();
