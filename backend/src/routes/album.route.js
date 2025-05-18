import { Router } from "express";
import{getAllAlbumById,getAllAlbums} from "../controller/album.controller.js";

const router = Router();

router.get("/",getAllAlbums);
router.get("/:albumId",getAllAlbumById);

export default router;