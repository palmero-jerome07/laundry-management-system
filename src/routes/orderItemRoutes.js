import express from "express";
const router = express.Router();

import orderItemController from "../controllers/orderItemController.js";

/**
 * @openapi
 * /api/order-items:
 *   post:
 *     summary: Add items to an order
 *     tags:
 *       - OrderItems
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_id
 *               - items
 *             properties:
 *               order_id:
 *                 type: integer
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - clothe_type
 *                     - weight_in_kilo
 *                   properties:
 *                     clothe_type:
 *                       type: string
 *                     weight_in_kilo:
 *                       type: number
 *     responses:
 *       200:
 *         description: Items added and order totals updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 totalWeight:
 *                   type: number
 *                 totalAmount:
 *                   type: number
 */
router.post("/", orderItemController.addItems);

/**
 * @openapi
 * /api/order-items/{id}:
 *   put:
 *     summary: Update an existing order item
 *     tags:
 *       - OrderItems
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the order item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clothe_type:
 *                 type: string
 *               weight_in_kilo:
 *                 type: number
 *     responses:
 *       200:
 *         description: Order item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 totalWeight:
 *                   type: number
 *                 totalAmount:
 *                   type: number
 */
router.put("/:id", orderItemController.updateItem);

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         item_id:
 *           type: integer
 *         order_id:
 *           type: integer
 *         clothe_type:
 *           type: string
 *         weight_in_kilo:
 *           type: number
 *         subtotal:
 *           type: number
 */
