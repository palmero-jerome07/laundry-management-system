import db from "../config/database.js";

const Service = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM tbl_services", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM tbl_services WHERE service_id = ?",
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  },

  create: (serviceData) => {
    const { service_name, price_per_kg, description } = serviceData;
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO tbl_services (service_name, price_per_kg, description) VALUES (?, ?, ?)",
        [service_name, price_per_kg, description],
        (err, results) => {
          if (err) reject(err);
          resolve({ id: results.insertId, ...serviceData });
        }
      );
    });
  },
};

export default Service;
