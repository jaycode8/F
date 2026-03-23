import * as FolderServices from "./folder.services.js";


export const destroy = async (req, res) => {
    try {
        await FolderServices.destroy(
            req.params.id,
            req.user._id
        );

        res.status(200).json({
            message: "Folder deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const folder = await FolderServices.update(
            req.params.id,
            req.user._id,
            { name: req.body.name }
        );

        res.status(200).json({
            data: folder,
            message: "Folder updated successfully"
        });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

export const get = async (req, res) => {
    try {
        const folder = await FolderServices.get(
            req.params.id,
            req.user._id
        );

        if (!folder) {
            return res.status(404).json({ detail: "Folder not found" });
        }

        res.status(200).json({ data: folder });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

export const list = async (req, res) => {
    try {
        const { page, limit, ...filters } = req.query;
        // filters.owner = req.user._id;
        filters.owner = "5c69077e-7682-4d89-809c-f6ec2a58f970";
        if (!filters.parent) filters.parent = null;

        const folders = await FolderServices.list(
            page,
            limit,
            filters
        );

        res.status(200).json({ data: folders });
    } catch (error) {
        res.status(500).json({ detail: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const { name, parent = null } = req.body;

        const folder = await FolderServices.create({
            name,
            parent,
            owner: req.user._id,
            username: req.user.username
        });

        res.status(201).json({
            data: folder,
            message: "Folder created successfully"
        });
    } catch (error) {
        res.status(400).json({ detail: error.message });
    }
};
