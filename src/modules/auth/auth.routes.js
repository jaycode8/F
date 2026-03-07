import { Router } from "express";
import * as AuthControllers from "./auth.controllers.js";
import * as AuthMiddleware from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/logout", AuthMiddleware.requireAuth, AuthControllers.logOut)

router.route("/")
    .get(AuthMiddleware.requireAuth, AuthControllers.authed)
    .post(AuthControllers.auth);

export default router;
