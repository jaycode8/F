import UserModel from "./user.models.js";
import bcrypt from "bcrypt";
import { paginate } from "../../utils/paginate.utils.js";
import path from "path";
import fs from "fs/promises";

const saltRounds = +process.env.SALT_ROUNDS;

export const destroy = async (id) => {
    return await UserModel.findByIdAndDelete(id);
};

export const update = async (id, data) => {
    if (data.password) data.password = await bcrypt.hash(data.password, saltRounds);
    return await UserModel.findByIdAndUpdate(id, data, { returnDocument: "after" });
};

export const get = async (id) => {
    return await UserModel.findById(id);
};

export const list = async (page, limit, filters = {}) => {
    return await paginate(UserModel, filters, { page, limit });
};

export const add = async (data) => {
    if (data.password) data.password = await bcrypt.hash(data.password, saltRounds);
    const user = await UserModel.create(data);

    const uploadRoot = path.join(process.cwd(), "uploads");
    await fs.mkdir(path.join(uploadRoot, user.username), { recursive: true });

    return user;
};
