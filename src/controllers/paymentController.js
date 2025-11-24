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

      const order = await Order.getById(order_id); //get the order total amnt

      if (!order || !order.total_amount) {
        return res.status(400).json({
          success: false,
          message: "Total amount of order not found.",
        });
      }

      const total = parseFloat(order.total_amount);
      const previousPayments = await Payment.getTotalPaid(order_id); //compute full amnt
      const totalPaid = previousPayments + parseFloat(amount_paid);
      const newBalance = total - totalPaid;
      const balanceForDB = newBalance > 0 ? newBalance : 0; //if greater than 0 ung balance, un ung new balance

      let paymentStatus;

      if (newBalance <= 0) {
        paymentStatus = "Fully Paid";
      } else if (totalPaid > 0) {
        paymentStatus = "Partially Paid";
      } else {
        paymentStatus = "Unpaid";
      }

      const newPayment = await Payment.create({
        order_id,
        amount_paid,
        payment_mode,
        payment_balance: balanceForDB,
        payment_status: paymentStatus,
      });

      //update status
      if (paymentStatus === "Fully Paid") {
        await Order.updateStatus(order_id, "Processing");
      }

      res.status(201).json({
        success: true,
        message: "Payment recorded successfully.",
        payment: newPayment,
        balance_remaining: balanceForDB,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating payment",
        error: error.message,
      });
    }
  },

  updatePaymentStatus: async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const { newStatus } = req.body;

      if (!newStatus) {
        return res.status(400).json({
          success: false,
          message: "The 'newStatus' field is required for update.",
        });
      }

      const result = await Payment.updatePaymentStatus(orderId, newStatus);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: `Payment record for Order ID ${orderId} not found or status is already '${newStatus}'.`,
        });
      }

      res.status(200).json({
        success: true,
        message: `Payment status for Order ID ${orderId} updated to '${newStatus}'.`,
        order_id: orderId,
        payment_status: newStatus,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating payment status.",
        error: error.message,
      });
    }
  },

  completePayment: async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const { amount_paid, payment_mode } = req.body;

      if (!amount_paid || !payment_mode) {
        return res.status(400).json({
          success: false,
          message: "Fields 'amount_paid' and 'payment_mode' are required.",
        });
      }

      const order = await Order.getById(orderId);
      if (!order || !order.total_amount) {
        return res.status(404).json({
          success: false,
          message: `Order ${orderId} not found or has no total amount.`,
        });
      }

      const total = parseFloat(order.total_amount);
      const prevPaid = await Payment.getTotalPaid(orderId);
      const totalPaid = parseFloat(prevPaid || 0) + parseFloat(amount_paid);
      const newBalance = total - totalPaid;
      const balanceForDB = newBalance > 0 ? newBalance : 0;

      let paymentStatus;
      if (newBalance <= 0) paymentStatus = "Fully Paid";
      else if (totalPaid > 0) paymentStatus = "Partially Paid";
      else paymentStatus = "Unpaid";

      const newPayment = await Payment.create({
        order_id: orderId,
        amount_paid,
        payment_mode,
        payment_balance: balanceForDB,
        payment_status: paymentStatus,
      });

      if (paymentStatus === "Fully Paid") {
        await Order.updateStatus(orderId, "Processing");
      }

      return res.status(200).json({
        success: true,
        message: "Payment applied successfully.",
        payment: newPayment,
        balance_remaining: balanceForDB,
        payment_status: paymentStatus,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error applying payment.",
        error: error.message,
      });
    }
  },
};

export default paymentController;
