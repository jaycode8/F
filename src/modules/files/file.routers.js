import { Router } from "express";
import * as FileControllers from "./file.controllers.js";
import { upload } from "../../configs/upload.config.js";
import * as AuthMiddleware from "../../middlewares/auth.middleware.js";

const router = Router();

// router.route("/:id")
//     .get(UserControllers.get)
//     .patch(UserControllers.update)
//     .delete(UserControllers.destroy);

router.route("/")
    .post(AuthMiddleware.requireAuth, upload.single("file"), FileControllers.add);
// .get(UserControllers.list);

export default router;
