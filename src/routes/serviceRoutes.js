import express from "express";
const router = express.Router();

import serviceController from "../controllers/serviceController.js";

/**
 * @openapi
 * /api/services:
 *   get:
 *     summary: Get all services
 *     tags:
 *       - Services
 *     responses:
 *       200:
 *         description: Array of service objects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 services:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Service'
 */
router.get("/", serviceController.getAll);

/**
 * @openapi
 * /api/services/name/{name}:
 *   get:
 *     summary: Search services by name (partial, case-insensitive)
 *     tags:
 *       - Services
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matching services
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 services:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Service'
 */
router.get("/name/:name", serviceController.getByName);

/**
 * @openapi
 * /api/services/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags:
 *       - Services
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Service object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found
 */
router.get("/:id", serviceController.getById);

/**
 * @openapi
 * /api/services:
 *   post:
 *     summary: Create a new service
 *     tags:
 *       - Services
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - service_name
 *               - price_per_kilo
 *             properties:
 *               service_name:
 *                 type: string
 *               price_per_kilo:
 *                 type: number
 *     responses:
 *       201:
 *         description: Service created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 service_id:
 *                   type: integer
 */
router.post("/", serviceController.create);

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         service_id:
 *           type: integer
 *         service_name:
 *           type: string
 *         price_per_kilo:
 *           type: number
 *         description:
 *           type: string
 */
