// import { deleteImage } from "../../configs/upload.config.js";
import FileModel from "./file.models.js";


// export const handleImageDeletion = async (id) => {
//     const menu = await MenuModel.findById(id);
//     await deleteImage(menu.image);
// }

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

