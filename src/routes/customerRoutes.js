import express from "express";
import customerController from "../controllers/customerController.js";
const router = express.Router();

router.get("/", customerController.getAll);
router.get("/:id", customerController.getById);
router.post("/", customerController.create);
//router.put("/:id", customerController);

export default router;
