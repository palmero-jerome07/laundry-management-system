import express from "express";
import orderItemController from "../controllers/orderItemController.js";
const router = express.Router();

router.post("/", orderItemController.addItems);

export default router;
