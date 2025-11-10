import express from "express";
const router = express.Router();

import orderController from "../controllers/orderController.js";

router.get("/", orderController.getAll);
router.get("/status/:status", orderController.getByStatus);
router.get("/name/:name", orderController.getByName);
router.get("/:id", orderController.getById);
router.post("/", orderController.create);
router.put("/:id/status", orderController.updateStatus);

export default router;
