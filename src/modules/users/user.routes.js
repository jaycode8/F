import { Router } from "express";
import * as UserControllers from "./user.controllers.js";

const router = Router();

router.route("/:id")
    .get(UserControllers.get)
    .patch(UserControllers.update)
    .delete(UserControllers.destroy);

router.route("/")
    .post(UserControllers.add)
    .get(UserControllers.list);

export default router;
