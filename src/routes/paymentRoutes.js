import express from "express";
const router = express.Router();

import paymentController from "../controllers/paymentController.js";

/**
 * @openapi
 * /api/payments:
 *   get:
 *     summary: Get all payments
 *     tags:
 *       - Payments
 *     responses:
 *       200:
 *         description: Array of payment objects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 payments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Payment'
 */
router.get("/", paymentController.getAll);

/**
 * @openapi
 * /api/payments:
 *   post:
 *     summary: Create a new payment for an order
 *     tags:
 *       - Payments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_id
 *               - amount
 *               - method
 *             properties:
 *               order_id:
 *                 type: integer
 *               amount:
 *                 type: number
 *               method:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 payment_id:
 *                   type: integer
 */
router.post("/", paymentController.create);

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         payment_id:
 *           type: integer
 *         order_id:
 *           type: integer
 *         amount:
 *           type: number
 *         method:
 *           type: string
 *         notes:
 *           type: string
 */
