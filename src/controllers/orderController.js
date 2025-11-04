import Order from "../models/orderModel.js";
import OrderItem from "../models/orderItemModel.js";

const orderController = {
  getAll: async (req, res) => {
    const orders = await Order.getAll();
    res.json(orders);
  },
  getById: async (req, res) => {
    const order = await Order.getById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    const items = await OrderItem.getByOrder(req.params.id);
    res.json({ ...order, items });
  },
  create: async (req, res) => {
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, ...order });
  },
  updateStatus: async (req, res) => {
    await Order.updateStatus(req.params.id, req.body.status);
    res.json({ success: true, message: "Order status updated" });
  },
};

export default orderController;
