import express from "express";
import serviceController from "../controllers/serviceController.js";
const router = express.Router();

router.get("/", serviceController.getAll);
router.get("/name/:name", serviceController.getByName);
router.get("/:id", serviceController.getById);

export default router;
