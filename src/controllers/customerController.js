import Customer from "../models/customerModel.js";

const customerController = {
  getAll: async (req, res) => {
    try {
      const customers = await Customer.getAll();

      if (customers.length === 0) {
        res.status(404).json({
          success: true,
          customers: "No customers yet.",
        });
      }

      res.status(200).json({
        success: true,
        customers: customers,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error fetching customers",
        error: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const customer = await Customer.getById(id);
      if (!customer || customer.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }
      res.status(200).json({
        success: true,
        data: customer,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error fetching customer",
        error: err.message,
      });
    }
  },
  getByName: async (req, res) => {
    try {
      const customerName = req.params.name;

      if (!customerName) {
        return res.status(400).json({
          success: false,
          message: "Customer name is required",
        });
      }

      const existingCustomer = await Customer.getByName(customerName);

      if (!existingCustomer) {
        return res.status(404).json({
          success: false,
          message: `No customer found with name: ${customerName}`,
        });
      }

      res.status(200).json({
        success: true,
        message: existingCustomer,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching customer",
        error: error.message,
      });
    }
  },
  create: async (req, res) => {
    try {
      const { full_name, contact, email, address } = req.body;

      if (!full_name || !contact || !email || !address) {
        return res.status(400).json({
          success: false,
          message:
            "All fields (full_name, contact, email, address) are required",
        });
      }

      const newCustomer = await Customer.create({
        full_name,
        contact,
        email,
        address,
      });

      res.status(201).json({
        success: true,
        message: "Customer added successfully",
        customer_id: newCustomer.id,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error creating customer",
        error: err.message,
      });
    }
  },

  update: async (req, res) => {
    try {
      const { full_name, contact, email, address } = req.body;
      const id = req.params.id;

      const existingCustomer = await Customer.getById(id);

      if (!existingCustomer) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      if (!full_name || !contact || !email || !address) {
        return res.status(400).json({
          success: false,
          message:
            "All fields (full_name, contact, email, address) are required",
        });
      }

      await Customer.update(id, { full_name, contact, email, address });
      res.status(201).json({
        success: true,
        message: `Customer ${req.params.id} updated.`,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Customer ${req.params.id} NOT updated`,
        error: error.message,
      });
    }
  },
};

export default customerController;
