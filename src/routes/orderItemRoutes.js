import express from "express";
const router = express.Router();

import orderItemController from "../controllers/orderItemController.js";

router.post("/", orderItemController.addItems);

export default router;
