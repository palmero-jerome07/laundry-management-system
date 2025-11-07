import OrderItem from "../models/orderItemModel.js";

const orderItemController = {
  addItems: async (req, res) => {
    try {
      const { order_id, items } = req.body;

      if (!order_id || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Order ID and a non-empty array of items are required.",
        });
      }

      const result = await OrderItem.addItems(order_id, items);

      res.status(201).json({
        success: true,
        message: "Items added successfully.",
        ...result,
      });
    } catch (error) {
      console.error("Error adding items:", error);
      res.status(500).json({
        success: false,
        message: "Failed to add items to the order.",
        error: error.message,
      });
    }
  },
};

export default orderItemController;
