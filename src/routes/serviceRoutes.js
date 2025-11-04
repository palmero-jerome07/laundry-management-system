import express from "express";
import serviceController from "../controllers/serviceController.js";
const router = express.Router();

router.get("/", serviceController.getAll);

export default router;
