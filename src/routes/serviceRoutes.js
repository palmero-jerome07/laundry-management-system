import express from "express";
const router = express.Router();

import serviceController from "../controllers/serviceController.js";

router.get("/", serviceController.getAll);
router.get("/name/:name", serviceController.getByName);
router.get("/:id", serviceController.getById);
router.post("/", serviceController.create);

export default router;
