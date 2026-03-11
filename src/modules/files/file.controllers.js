import * as FileServices from "./file.services.js";
import { uploadFile } from "../../configs/upload.config.js";
import path from "path";

export const destroy = async (req, res) => {
    try {
        const id = req.params.id;

        await FileServices.handleFileDeletion(id);

        await FileServices.destroy(id);
        res.status(200).json({ message: `File has been deleted successfully` });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
}

export const update = async (req, res) => {
    try {
        const fileId = req.params.id;

        const file = req.file;
        const folder = req.body?.folder ? req.body.folder : null;
        const safeFolder = folder?.replace(/[^a-zA-Z0-9/_-]/g, "");
        let updateData;

        if (file) {
            const baseUrl = `${req.protocol}://${req.get("host")}`;

            const fileUrl = await uploadFile(file, baseUrl, safeFolder);
            if (!fileUrl) throw new Error("File upload failed");

            updateData = {
                fileUrl: fileUrl,
                fileName: path.parse(file.originalname).name,
                mimetype: file.mimetype,
                fileSize: file.size,
                owner: req.user,
                folder: safeFolder
            };

            await FileServices.handleFileDeletion(fileId);

        } else {
            updateData = { safeFolder }
        }

        const data = await FileServices.update(fileId, updateData);
        res.status(200).json({ data, message: `Record was updated successfully` });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
}

export const get = async (req, res) => {
    try {
        const data = await FileServices.get(req.params.id);
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
}

export const list = async (req, res) => {
    try {
        const data = await FileServices.list();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
}

export const add = async (req, res) => {
    try {
        const file = req.file;
        const folder = req.body.folder ? req.body.folder : null;
        const safeFolder = folder?.replace(/[^a-zA-Z0-9/_-]/g, "");

        if (!file) return res.status(400).json({ detail: "File is required" });

        const baseUrl = `${req.protocol}://${req.get("host")}`;

        const fileUrl = await uploadFile(file, baseUrl, safeFolder);
        if (!fileUrl) throw new Error("File upload failed");

        const data = {
            fileUrl: fileUrl,
            fileName: path.parse(file.originalname).name,
            mimetype: file.mimetype,
            fileSize: file.size,
            owner: req.user,
            folder: safeFolder
        };

        await FileServices.add(data);

        res.status(201).json({ message: `File uploaded successfully.` });
    } catch (error) {
        console.log(error)

        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            const value = error.keyValue[field];
            return res.status(409).json({
                detail: `${value} already exists`
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                detail: Object.values(error.errors).map(e => e.message)[0]
            });
        }
        res.status(500).json({ detail: error.message });
    }
}
