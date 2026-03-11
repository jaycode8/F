import multer from "multer";

export const handleUpload = (uploadHandler) => {
    return (req, res, next) => {

        uploadHandler(req, res, (err) => {

            if (err instanceof multer.MulterError) {

                if (err.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).json({
                        detail: "File too large. Maximum allowed size is 5MB."
                    });
                }

                if (err.code === "LIMIT_FILE_COUNT") {
                    return res.status(400).json({
                        detail: "Too many files uploaded. Maximum allowed count is 10."
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
