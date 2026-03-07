import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
        },

        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            select: false
        },

        profile_pic: String,

        lastLogin: Date,

    },
    { timestamps: true }
);

userSchema.index({
    email: "text",
    username: "text",
});

export default mongoose.model("users", userSchema);
