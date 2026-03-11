import multer from "multer";
import crypto from "crypto";
import path from "path";
import fs from "fs/promises";


const allowedExt = [
    ".png", ".jpg", ".jpeg", ".webp", ".gif",
    ".pdf", ".doc", ".docx",
    ".xls", ".xlsx",
    ".txt",
    ".zip"
];

export const deleteFile = async (url) => {
    if (!url) return false;

    try {

        const relativePath = new URL(url).pathname;
        const filePath = path.join(process.cwd(), relativePath);

        await fs.unlink(filePath);

        return true;

    } catch (error) {
        return false;
    }
};

export const uploadFile = async (file, baseUrl, folder) => {

    const uploadRoot = path.join(process.cwd(), "uploads");

    const targetDir = folder
        ? path.join(uploadRoot, folder)
        : uploadRoot;

    // create nested folders if they don't exist
    await fs.mkdir(targetDir, { recursive: true });

    const ext = file.originalname.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${ext}`;

    const filePath = path.join(targetDir, fileName);

    try {

        await fs.writeFile(filePath, file.buffer);

        const uploadUrl = folder
            ? `${baseUrl}/uploads/${folder}/${fileName}`
            : `${baseUrl}/uploads/${fileName}`;

        return uploadUrl;

    } catch (error) {

        console.error("Upload Error:", error);
        return null;

    }
};

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
        files: 10
    },
    fileFilter: (req, file, cb) => {

        const ext = path.extname(file.originalname).toLowerCase();

        if (!allowedExt.includes(ext)) {
            return cb(new Error("Only image files are allowed"));
        }
        cb(null, true);
    },
});
