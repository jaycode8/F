import multer from "multer";
import crypto from "crypto";
import path from "path";
import fs from "fs/promises";


export const deleteFile = async (url) => {
    if (!url) return false;

    try {
        const relativePath = url.split("/uploads/")[1];
        if (!relativePath) return false;

        const filePath = path.join(process.cwd(), "uploads", relativePath);
        await fs.unlink(filePath);

        return true;
    } catch {
        return false;
    }
};

export const uploadFile = async (file, baseUrl, folder) => {
    const uploadDir = path.join(process.cwd(), "uploads");

    await fs.mkdir(uploadDir, { recursive: true });

    const ext = file.originalname.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${ext}`;
    const filePath = path.join(uploadDir, fileName);

    try {
        await fs.writeFile(filePath, file.buffer);

        return `${baseUrl}/uploads/${folder}/${fileName}`;
    } catch (error) {
        console.error("Upload Error:", error);
        return "";
    }
};

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed"));
        }
        cb(null, true);
    },
});
