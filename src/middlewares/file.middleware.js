import multer from "multer";

export const handleUpload = (uploadInstance) => {
    return (req, res, next) => {

        uploadInstance.single("file")(req, res, (err) => {

            if (err instanceof multer.MulterError) {

                if (err.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).json({
                        detail: "File too large. Maximum allowed size is 5MB."
                    });
                }

                return res.status(400).json({
                    detail: err.message
                });
            }

            if (err) {
                return res.status(400).json({
                    detail: err.message
                });
            }

            next();
        });

    };
};
