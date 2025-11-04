import Payment from "../models/paymentModel.js";

const paymentController = {
  create: async (req, res) => {
    const payment = await Payment.create(req.body);
    res.status(201).json({ success: true, ...payment });
  },
};

export default paymentController;
