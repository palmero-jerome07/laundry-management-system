import db from "../config/database.js";

const Customer = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM tbl_customers", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM tbl_customers WHERE customer_id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  },
  create: (customerData) => {
    const { full_name, contact, email, address } = customerData;
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO tbl_customers (full_name, contact, email, address) VALUES (?, ?, ?, ?)",
        [full_name, contact, email, address],
        (err, results) => {
          if (err) reject(err);
          resolve({ id: results.insertId, ...customerData });
        }
      );
    });
  },
  update: (id, customerData) => {
    const { full_name, contact, email, address } = customerData;
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE tbl_customers SET full_name = ?, contact = ?, email = ?, address = ? WHERE customer_id = ?",
        [full_name, contact, email, address, id],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  },
};

export default Customer;
