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

  getByName: (service_name) => {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT * FROM tbl_services 
      WHERE service_name LIKE ?`;
      const searchTerm = `%${service_name}%`; // allows partial matching

      db.query(query, [searchTerm], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  create: (serviceData) => {
    const { service_name, price_per_kilo, description } = serviceData;
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO tbl_services (service_name, price_per_kilo, description) VALUES (?, ?, ?)",
        [service_name, price_per_kilo, description],
        (err, results) => {
          if (err) reject(err);
          resolve({ id: results.insertId, ...serviceData });
        }
      );
    });
  },
};

export default Service;
