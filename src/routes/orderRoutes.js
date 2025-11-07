import express from "express";
import orderController from "../controllers/orderController.js";
const router = express.Router();

router.get("/", orderController.getAll);
router.get("/status/:status", orderController.getByStatus);
router.get("/:id", orderController.getById);
router.post("/", orderController.create);
router.put("/:id/status", orderController.updateStatus);

export default router;
