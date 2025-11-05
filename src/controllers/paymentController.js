import Payment from "../models/paymentModel.js";

const paymentController = {
  create: async (req, res) => {
    const { order_id, amount_paid, payment_mode } = req.body;
    const payment = await Payment.create({
      order_id,
      amount_paid,
      payment_mode,
    });
    res.status(201).json({ success: true, ...payment });
  },
};

export default paymentController;
