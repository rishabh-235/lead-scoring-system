import { Router } from "express";
import { createOffer } from "../controllers/offer.controller.js";

const router = Router();

router.route("/").post(createOffer);

export default router;
