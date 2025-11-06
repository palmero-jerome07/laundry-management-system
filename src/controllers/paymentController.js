import Payment from "../models/paymentModel.js";

const paymentController = {
  create: async (req, res) => {
    try {
      const { order_id, amount_paid, payment_mode } = req.body;
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
