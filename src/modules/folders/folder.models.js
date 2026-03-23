import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const folderSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        owner: {
            type: String,
            ref: "users",
            required: true,
            index: true
        },

        parent: {
            type: String,
            ref: "folders",
            default: null
        },

        level: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

export default mongoose.model("folders", folderSchema);
