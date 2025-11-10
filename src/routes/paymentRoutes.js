import express from "express";
const router = express.Router();

import paymentController from "../controllers/paymentController.js";

router.get("/", paymentController.getAll);
router.post("/", paymentController.create);

export default router;
