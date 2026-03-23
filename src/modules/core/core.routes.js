import { Router } from "express";
import * as CoreControllers from "./core.controlers.js";

const router = Router();

router.get("/explore", CoreControllers.explore);
router.get("/my-files", CoreControllers.files);
router.get("/dashboard", CoreControllers.dashboard);
router.get("/signin", CoreControllers.signin);

export default router;
