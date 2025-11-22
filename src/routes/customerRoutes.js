import express from "express";
const router = express.Router();

import customerController from "../controllers/customerController.js";

/**
 * @openapi
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     tags:
 *       - Customers
 *     responses:
 *       200:
 *         description: Array of customer objects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 customers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Customer'
 *       404:
 *         description: No customers found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: No customers found
 */
router.get("/", customerController.getAll);

/**
 * @openapi
 * /api/customers/name/{name}:
 *   get:
 *     summary: Search customers by name (partial, case-insensitive)
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Partial or full name to search for
 *     responses:
 *       200:
 *         description: Matching customers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Missing name parameter
 */
router.get("/name/:name", customerController.getByName);

/**
 * @openapi
 * /api/customers/{id}:
 *   get:
 *     summary: Get a customer by ID
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found
 */
router.get("/:id", customerController.getById);

/**
 * @openapi
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     tags:
 *       - Customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - contact
 *               - email
 *               - address
 *             properties:
 *               full_name:
 *                 type: string
 *               contact:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 customer_id:
 *                   type: integer
 *       400:
 *         description: Validation error
 */
router.post("/", customerController.create);

/**
 * @openapi
 * /api/customers/{id}:
 *   put:
 *     summary: Update an existing customer
 *     tags:
 *       - Customers
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
 *               - full_name
 *               - contact
 *               - email
 *               - address
 *             properties:
 *               full_name:
 *                 type: string
 *               contact:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Validation error
 *       404:
 *         description: Customer not found
 */
router.put("/:id", customerController.update);

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         customer_id:
 *           type: integer
 *         full_name:
 *           type: string
 *         contact:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         address:
 *           type: string
 */
