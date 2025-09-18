import { Router } from "express";
import multer from "multer";
import {
  uploadLeads,
  scoreLeads,
  getResults,
} from "../controllers/lead.controller.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.route("/upload").post(upload.single("file"), uploadLeads);
router.route("/score").post(scoreLeads);
router.route("/results").get(getResults);

export default router;
