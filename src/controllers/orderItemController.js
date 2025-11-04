import OrderItem from "../models/orderItemModel.js";

const orderItemController = {
  addItems: async (req, res) => {
    const { order_id, items } = req.body;
    const result = await OrderItem.addItems(order_id, items);
    res.status(201).json({ success: true, ...result });
  },
};

export default orderItemController;
