import db from "../config/database.js";

const OrderItem = {
  addItems: (order_id, items) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT s.price_per_kilo 
       FROM tbl_orders o 
       JOIN tbl_services s ON o.service_id = s.service_id 
       WHERE o.order_id = ?`,
        [order_id],
        (err, serviceResult) => {
          if (err) return reject(err);
          if (!serviceResult.length)
            return reject(new Error("Order not found or service missing"));

          const pricePerKilo = serviceResult[0].price_per_kilo;
          let totalWeight = 0;
          let totalAmount = 0;

          // Use simple for loop
          let completed = 0;
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const subtotal = item.weight_in_kilo * pricePerKilo;
            totalWeight += item.weight_in_kilo;
            totalAmount += subtotal;

            db.query(
              "INSERT INTO tbl_order_items (order_id, clothe_type, weight_in_kilo, subtotal) VALUES (?, ?, ?, ?)",
              [order_id, item.clothe_type, item.weight_in_kilo, subtotal],
              (err) => {
                if (err) return reject(err);
                completed++;
                if (completed === items.length) {
                  db.query(
                    "UPDATE tbl_orders SET total_weight = ?, total_amount = ? WHERE order_id = ?",
                    [totalWeight, totalAmount, order_id],
                    (err) => {
                      if (err) return reject(err);
                      resolve({ totalWeight, totalAmount });
                    }
                  );
                }
              }
            );
          }
        }
      );
    });
  },

  getByOrder: (order_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM tbl_order_items WHERE order_id = ?",
        [order_id],
        (err, results) => {
          if (err) reject(err);
          else resolve(results);
        }
      );
    });
  },
};

export default OrderItem;
