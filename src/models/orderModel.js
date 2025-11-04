import db from "../config/database.js";

const Order = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT o.*, c.full_name, s.service_name
         FROM tbl_orders o
         JOIN tbl_customers c ON o.customer_id = c.customer_id
         JOIN tbl_services s ON o.service_id = s.service_id`,
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
        "SELECT * FROM tbl_orders WHERE order_id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  },

  create: (orderData) => {
    const { customer_id, service_id, weight_kg, status, total_amount } =
      orderData;
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO tbl_orders (customer_id, service_id, weight_kg, status, total_amount) VALUES (?, ?, ?, ?, ?)",
        [customer_id, service_id, weight_kg, status, total_amount],
        (err, results) => {
          if (err) reject(err);

          if (!results || results.length === 0) {
            return resolve(null);
          }

          resolve({ id: results.insertId, ...orderData });
        }
      );
    });
  },
};

export default Order;
