import { Router } from "express";
import { checkVisibility } from "../controllers/visibility.controller";

const router = Router();

router.post("/check", checkVisibility);

export default router;
