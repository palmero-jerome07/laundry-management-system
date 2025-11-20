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

  updateItem: async (item_id, updatedData) => {
    if (!updatedData.clothe_type || typeof updatedData.weight_in_kilo !== "number") {
      throw new Error("clothe_type and weight_in_kilo are required and must be valid");
    }

 
    const itemResults = await new Promise((resolve, reject) => {
      db.query(
        `SELECT oi.order_id, s.price_per_kilo
         FROM tbl_order_items oi
         JOIN tbl_orders o ON oi.order_id = o.order_id
         JOIN tbl_services s ON o.service_id = s.service_id
         WHERE oi.item_id = ?`,
        [item_id],
        (err, results) => {
          if (err) return reject(err);
          if (!results.length) return reject(new Error("Order item not found"));
          resolve(results[0]);
        }
      );
    });

    const { order_id, price_per_kilo } = itemResults;
    const subtotal = updatedData.weight_in_kilo * price_per_kilo;


    await new Promise((resolve, reject) => {
      db.query(
        `UPDATE tbl_order_items
         SET clothe_type = ?, weight_in_kilo = ?, subtotal = ?
         WHERE item_id = ?`,
        [updatedData.clothe_type, updatedData.weight_in_kilo, subtotal, item_id],
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });


    const totals = await new Promise((resolve, reject) => {
      db.query(
        `SELECT SUM(weight_in_kilo) AS totalWeight, SUM(subtotal) AS totalAmount
         FROM tbl_order_items
         WHERE order_id = ?`,
        [order_id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0]);
        }
      );
    });

    await new Promise((resolve, reject) => {
      db.query(
        `UPDATE tbl_orders
         SET total_weight = ?, total_amount = ?
         WHERE order_id = ?`,
        [totals.totalWeight, totals.totalAmount, order_id],
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });

    return { success: true, totalWeight: totals.totalWeight, totalAmount: totals.totalAmount };
  },
};

export default OrderItem;
