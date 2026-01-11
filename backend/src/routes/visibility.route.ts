import { Router } from "express";
import { checkVisibility } from "../controllers/visibility.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/check", requireAuth, checkVisibility);

export default router;
