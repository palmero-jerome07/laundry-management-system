import db from "../config/database.js";

const Payment = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT p.*, o.order_id, c.full_name 
         FROM tbl_payments p
         JOIN tbl_orders o ON p.order_id = o.order_id
         JOIN tbl_customers c ON o.customer_id = c.customer_id`,
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM tbl_payments WHERE payment_id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  },

  create: (paymentData) => {
    const { order_id, amount_paid, payment_mode } = paymentData;
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO tbl_payments (order_id, amount_paid, payment_mode) VALUES (?, ?, ?)",
        [order_id, amount_paid, payment_mode],
        (err, results) => {
          if (err) return reject(err);
          if (!results) {
            return reject(new Error("No result returned from database"));
          }
          resolve({ id: results.insertId, ...paymentData });
        }
      );
    });
  },
};

export default Payment;
