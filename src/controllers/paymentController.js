import Payment from "../models/paymentModel.js";
import Order from "../models/orderModel.js";

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

      const order = await Order.getById(order_id);//get the order total amnt

      if (!order || !order.total_amount) {
        return res.status(400).json({
          success: false,
          message:
            "Total amount of order not found.",
        });
      }

      const total = parseFloat(order.total_amount);
      const previousPayments = await Payment.getTotalPaid(order_id);//compute full amnt
      const totalPaid = previousPayments + parseFloat(amount_paid);
      const newBalance = total - totalPaid;
      const balance = newBalance > 0 ? newBalance : 0; //if greater than 0 ung balance, un ung new balance

      const newPayment = await Payment.create({
        order_id,
        amount_paid,
        payment_mode,
        payment_balance: balance,
      });

      //update status based sa balance
      let newStatus = (balance === 0) ? 'Processing' : 'Partially Paid';
      await Order.updateStatus(order_id, newStatus);

      res.status(201).json({ 
          success: true, 
          message: "Payment recorded successfully.",
          payment: newPayment,
          balance_remaining: balance
      });

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
