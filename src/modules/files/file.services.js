import { deleteFile } from "../../configs/upload.config.js";
import FileModel from "./file.models.js";
import { paginate } from "../../utils/paginate.utils.js";

export const handleFileDeletion = async (id) => {
    const file = await FileModel.findById(id);
    if (!file) throw new Error("File not found");

    await deleteFile(file.fileUrl);
};

export const destroy = async (id, owner) => {
    return await FileModel.findOneAndDelete({ _id: id, owner });
};

export const update = async (id, owner, data) => {
    return await FileModel.findOneAndUpdate(
        { _id: id, owner },
        data,
        { new: true }
    );
};

export const get = async (id, owner) => {
    return await FileModel.findOne({ _id: id, owner });
};

export const list = async (page, limit, filters = {}, search = null) => {
    return await paginate(FileModel, filters, {
        page,
        limit,
        search,
        searchFields: [],
        populate: [
            { path: "owner", select: "username" },
            { path: "folder", select: "name" },
        ]
    });
};

export const add = async (data) => {
    return await FileModel.create(data);
};
