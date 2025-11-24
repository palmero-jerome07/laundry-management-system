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

/**
 * @openapi
 * /api/payments/{orderId}:
 *   put:
 *     summary: Update payment status for an order
 *     description: Updates the payment status of an existing payment record
 *     tags:
 *       - Payments
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The order ID associated with the payment
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newStatus
 *             properties:
 *               newStatus:
 *                 type: string
 *                 enum: [pending, completed, failed, refunded]
 *                 example: completed
 *     responses:
 *       200:
 *         description: Payment status successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Payment status updated
 *       400:
 *         description: Invalid status value
 *       404:
 *         description: Payment or order not found
 *       500:
 *         description: Server error
 */
router.put("/:orderId", paymentController.updatePaymentStatus);

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
 *         payment_mode:
 *           type: string
 *         amount_paid:
 *           type: number
 *         payment_balance:
 *           type: number
 *         payment_status:
 *           type: string
 *         payment_date:
 *           type: string
 *           format: date-time
 */
