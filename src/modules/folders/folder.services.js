import FolderModel from "./folder.models.js";
import path from "path";
import fs from "fs/promises";
import { paginate } from "../../utils/paginate.utils.js";


export const destroy = async (id, owner) => {
    return await FolderModel.findOneAndDelete({ _id: id, owner });
};

export const update = async (id, owner, data) => {
    return await FolderModel.findOneAndUpdate(
        { _id: id, owner },
        data,
        { returnDocument: true }
    );
};

export const get = async (id, owner) => {
    return await FolderModel.findOne({ _id: id, owner });
};

export const list = async (page, limit, filters = {}, search = null) => {
    return await paginate(FolderModel, filters, {
        page,
        limit,
        search,
        searchFields: [],
        populate: [
            { path: "owner", select: "username" },
            { path: "parent", select: "name" },
        ]
    });
};

export const create = async ({ name, owner, parent = null, username }) => {
    let level = 0;

    if (parent) {
        const parentFolder = await FolderModel.findById(parent);
        if (!parentFolder) throw new Error("Parent folder not found");

        if (parentFolder.level >= 2) {
            throw new Error("Maximum folder depth reached");
        }

        level = parentFolder.level + 1;
    }

    //NOTE: employ transactions in that if folder fails to create dont save it in db

    const folder = await FolderModel.create({
        name,
        owner,
        parent,
        level
    });

    const uploadRoot = path.join(process.cwd(), "uploads");

    const targetDir = path.join(uploadRoot, username);

    if (folder.level === 0) await fs.mkdir(path.join(targetDir, folder._id), { recursive: true });

    if (folder.level === 1) await fs.mkdir(path.join(path.join(targetDir, folder.parent), folder._id), { recursive: true });

    return folder;
};
