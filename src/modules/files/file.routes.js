import { Router } from "express";
import * as FileControllers from "./file.controllers.js";
import { upload } from "../../configs/upload.config.js";
import * as AuthMiddleware from "../../middlewares/auth.middleware.js";
import { handleUpload } from "../../middlewares/file.middleware.js";

const router = Router();

// router.use(AuthMiddleware.requireAuth);

router.route("/:id")
    .get(FileControllers.get)
    .patch(handleUpload(upload), FileControllers.update)
    .delete(FileControllers.destroy);

router.route("/")
    .post(handleUpload(upload.array("files", 10)), FileControllers.add)
    .get(FileControllers.list);

export default router;
