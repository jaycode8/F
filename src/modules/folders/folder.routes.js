import { Router } from "express";
import * as FolderControllers from "./folder.controllers.js";
import * as AuthMiddleware from "../../middlewares/auth.middleware.js";

const router = Router();

// router.use(AuthMiddleware.requireAuth);

router.route("/:id")
    .get(FolderControllers.get)
    .patch(FolderControllers.update)
    .delete(FolderControllers.destroy);

router.route("/")
    .post(FolderControllers.create)
    .get(FolderControllers.list);

export default router;
