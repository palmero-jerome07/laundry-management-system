import express from "express";
import paymentController from "../controllers/paymentController.js";
const router = express.Router();

router.post("/", paymentController.create);

export default router;
