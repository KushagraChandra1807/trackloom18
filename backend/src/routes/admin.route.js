import { Router } from "express";
import {
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
  checkAdmin
} from "../controller/admin.controller.js";

import {
  protectRoute,
  requireAdmin
} from "../middleware/auth.middleware.js";

const router = Router();

// ✅ Route to check if user is admin (no need to requireAdmin here)
router.get("/check", protectRoute, checkAdmin);

// ✅ Protected admin routes
router.use(protectRoute, requireAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;
