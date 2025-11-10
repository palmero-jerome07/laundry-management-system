import express from "express";
const router = express.Router();

import customerController from "../controllers/customerController.js";

router.get("/", customerController.getAll);
router.get("/name/:name", customerController.getByName);
router.get("/:id", customerController.getById);
router.post("/", customerController.create);
//router.put("/:id", customerController);

export default router;
