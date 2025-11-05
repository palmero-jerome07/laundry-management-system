import Order from "../models/orderModel.js";
import OrderItem from "../models/orderItemModel.js";

const orderController = {
  getAll: async (req, res) => {
    try {
      const orders = await Order.getAll();
      res.status(200).json({
        success: true,
        orders: orders,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error fetching orders",
        error: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const order = await Order.getById(req.params.id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
          error: error.message,
        });
      }

      const items = await OrderItem.getByOrder(req.params.id);
      if (!items) {
        return res.status(404).json({
          message: "Order_Item not found",
          error: error.message,
        });
      }

      res.status(200).json({
        success: true,
        order: order,
        items: items,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error fetching ${req.params.id}`,
        error: error.message,
      });
    }
  },
  create: async (req, res) => {
    try {
      const { customer_id, service_id } = req.body;

      if (!customer_id || !service_id) {
        return res.status(400).json({
          success: false,
          message: "All fields (customer_id, service_id) are required",
          error: error.message,
        });
      }
      const newOrder = await Order.create({
        customer_id,
        service_id,
      });

      res.status(201).json({
        success: true,
        message: "Order created successfully",
        order_id: newOrder.id,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating order",
        error: error.message,
      });
    }
  },
  updateStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const id = req.params.id;

      const existingId = await Order.getById(id);

      if (!existingId) {
        return res.status(404).json({
          success: false,
          message: `Order with id ${id} not found`,
        });
      }

      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Field {status} is required",
        });
      }

      await Order.updateStatus(id, status);

      res.status(200).json({
        sucess: true,
        message: "Status updated",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error updating status of order ${req.params.id}`,
        error: error.message,
      });
    }
  },
};

export default orderController;
