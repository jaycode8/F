import * as FileServices from "./file.services.js";
import { uploadFile } from "../../configs/upload.config.js";
import path from "path";
import { get as getFolder } from "../folders/folder.services.js";

export const destroy = async (req, res) => {
    try {
        const id = req.params.id;

        await FileServices.handleFileDeletion(id);
        await FileServices.destroy(id, req.user._id);

        res.status(200).json({
            message: "File deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

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
        const data = await FileServices.get(req.params.id, req.user._id);
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
}

export const list = async (req, res) => {
    try {
        const { page, limit, ...filters } = req.query;
        filters.owner = "5c69077e-7682-4d89-809c-f6ec2a58f970";
        // filters.owner = req.user._id;
        if (!filters.folder) filters.folder = null;

        const data = await FileServices.list(
            page,
            limit,
            filters
        );

        // res.status(200).json({ data });
        console.log(data)
        res.render('files', {
            title: 'Files',
            fileData: data,
            // currentFolder: folder || null,
            // currentSearch: search || null,
        });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

export const add = async (req, res) => {
    try {
        const files = req.files;
        const folderId = req.body.folder || null;
        const username = req.user.username;

        if (!files || files.length === 0) {
            return res.status(400).json({ detail: "At least one file is required" });
        }

        const baseUrl = `${req.protocol}://${req.get("host")}`;

        let storagePath = username;

        if (folderId) {
            const folder = await getFolder(folderId, req.user._id);

            if (folder && folder.level === 0) storagePath = `${username}/${folder._id}`

            if (folder && folder.level === 1) storagePath = `${username}/${folder.parent}/${folder._id}`
        }

        for (const file of files) {
            const fileUrl = await uploadFile(file, baseUrl, storagePath);

            await FileServices.add({
                fileUrl,
                fileName: path.parse(file.originalname).name,
                mimetype: file.mimetype,
                fileSize: file.size,
                owner: req.user._id,
                folder: folderId
            });
        }

        res.status(201).json({
            message: `${files.length} file(s) uploaded successfully`
        });

    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};
