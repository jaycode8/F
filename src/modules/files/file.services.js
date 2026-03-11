import { deleteFile } from "../../configs/upload.config.js";
import FileModel from "./file.models.js";


export const handleFileDeletion = async (id) => {
    const file = await FileModel.findById(id);
    const x = await deleteFile(file.fileUrl);
    console.log(x)
}

export const destroy = async (id) => {
    return await FileModel.findByIdAndDelete(id);
}

export const update = async (id, data) => {
    return await FileModel.findByIdAndUpdate(id, data, { returnDocument: 'after' });
}

export const get = async (id) => {
    return await FileModel.findById(id);
}

export const list = async () => {
    return await FileModel.find().sort("-createdAt");
}

export const add = async (data) => {
    const file = new FileModel(data)

    return await file.save();
}

