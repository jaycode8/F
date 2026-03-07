import * as FileServices from "./file.services.js";
import { uploadFile, deleteFile } from "../../configs/upload.config.js";

// export const destroy = async (req, res) => {
//     try {
//         const id = req.params.id;
//
//         await MenuServices.handleImageDeletion(id);
//
//         await MenuServices.destroy(req.params.id);
//         res.status(201).json({ message: `Menu has been deleted successfully` });
//     } catch (error) {
//         res.status(500).json({ detail: error.message });
//     }
// }
//
// export const update = async (req, res) => {
//     let imgUri = "";
//     try {
//         const file = req.file;
//         const id = req.params.id;
//
//         if (file) {
//             await MenuServices.handleImageDeletion(id);
//
//             const baseUrl = `${req.protocol}://${req.get("host")}`;
//
//             imgUri = await uploadImage(file, "menu", baseUrl);
//
//             req.body.image = imgUri;
//         }
//
//         const data = await MenuServices.update(id, req.body);
//         res.status(200).json({ data, message: `Record was updated successfully` });
//     } catch (error) {
//         if (imgUri) await deleteImage(imgUri);
//
//         res.status(500).json({ detail: error.message });
//     }
// }
//
// export const get = async (req, res) => {
//     try {
//         const data = await MenuServices.get(req.params.id);
//         res.status(200).json({ data });
//     } catch (error) {
//         res.status(500).json({ detail: error.message });
//     }
// }
//
// export const list = async (req, res) => {
//     try {
//         const data = await MenuServices.list();
//         res.status(200).json({ data });
//     } catch (error) {
//         res.status(500).json({ detail: error.message });
//     }
// }

export const add = async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ detail: "File is required" });

        const baseUrl = `${req.protocol}://${req.get("host")}`;

        const fileUrl = await uploadFile(file, baseUrl, "");
        if (!fileUrl) throw new Error("File upload failed");

        const data = {
            fileUrl: fileUrl,
            fileName: file.originalname,
            mimetype: file.mimetype,
            fileSize: file.size,
            owner: req.user
        };

        await FileServices.add(data);

        res.status(201).json({ data, message: `File uploaded successfully.` });
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
