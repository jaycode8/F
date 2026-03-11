import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const filesSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4
        },

        fileUrl: {
            type: String,
            required: true
        },

        fileName: {
            type: String,
            required: true
        },

        mimetype: {
            type: String,
            required: true
        },

        fileSize: {
            type: Number,
            required: true
        },

        owner: {
            type: String,
            ref: "users",
            required: true,
            index: true
        },

        folder: String,

    },
    { timestamps: true }
);

export default mongoose.model("files", filesSchema);
