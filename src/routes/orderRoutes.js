import express from "express";
const router = express.Router();

import orderController from "../controllers/orderController.js";

/**
 * @openapi
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Array of order objects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 */
router.get("/", orderController.getAll);

/**
 * @openapi
 * /api/orders/status/{status}:
 *   get:
 *     summary: Get orders by status
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orders filtered by status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 */
router.get("/status/:status", orderController.getByStatus);

/**
 * @openapi
 * /api/orders/delivery/{delivery_methods}:
 *   get:
 *     summary: Get orders by delivery method
 *     description: Retrieves all orders filtered by the specified delivery method
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: delivery_methods
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pickup, delivery, mail]
 *         description: Delivery method to filter by
 *         example: delivery
 *     responses:
 *       200:
 *         description: Orders filtered by delivery method
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid delivery method
 *       404:
 *         description: No orders found for this delivery method
 *       500:
 *         description: Server error
 */
router.get(
  "/delivery/:delivery_methods",
  orderController.getOrdersByDeliveryMethod
);

/**
 * @openapi
 * /api/orders/name/{name}:
 *   get:
 *     summary: Search orders by customer name
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matching orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 */
router.get("/name/:name", orderController.getByName);

/**
 * @openapi
 * /api/orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 */
router.get("/:id", orderController.getById);

/**
 * @openapi
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - service_id
 *             properties:
 *               customer_id:
 *                 type: integer
 *               service_id:
 *                 type: integer
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 order_id:
 *                   type: integer
 */
router.post("/", orderController.create);

/**
 * @openapi
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update order status
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Status updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.put("/:id/status", orderController.updateStatus);

/**
 * @openapi
 * /api/orders/delivery/{id}:
 *   put:
 *     summary: Update order delivery method
 *     description: Updates the delivery method for an existing order, use ["In-store Pickup or Drop-off"]
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The order ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - delivery_methods
 *             properties:
 *               delivery_methods:
 *                 type: string
 *                 enum: ["In-store Pickup", "Drop-off"]
 *                 example: "In-store Pickup"
 *     responses:
 *       200:
 *         description: Delivery method successfully updated
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
 *                   example: Delivery method updated
 *       400:
 *         description: Invalid delivery method
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.put("/delivery/:id", orderController.updateDelivery);

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         order_id:
 *           type: integer
 *         customer_id:
 *           type: integer
 *         service_id:
 *           type: integer
 *         status:
 *           type: string
 *         total_weight:
 *           type: number
 *         total_amount:
 *           type: number
 *         delivery_methods:
 *           type: string
 *           enum:
 *             - In-store Pickup
 *             - Drop-off
 *         created_at:
 *           type: string
 *           format: date-time
 */
