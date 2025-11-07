import Payment from "../models/paymentModel.js";

const paymentController = {
  getAll: async (req, res) => {
    try {
      const payments = await Payment.getAll();
      res.status(200).json({
        success: true,
        customers: payments,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error fetching customers",
        error: err.message,
      });
    }
  },

  create: async (req, res) => {
    try {
      const { order_id, amount_paid, payment_mode } = req.body;

      if (!order_id || !amount_paid || !payment_mode) {
        return res.status(400).json({
          success: false,
          message:
            "All fields (order_id, amount_paid, payment_mode) are required",
        });
      }

      const payment = await Payment.create({
        order_id,
        amount_paid,
        payment_mode,
      });
      res.status(201).json({ success: true, ...payment });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating payment",
        error: error.message,
      });
    }
  },
};

export default paymentController;
