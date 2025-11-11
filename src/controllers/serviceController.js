import Service from "../models/serviceModel.js";

const serviceController = {
  getAll: async (req, res) => {
    try {
      const services = await Service.getAll();

      if (!services) {
        return res.status(404).json({
          success: false,
          message: "No services found.",
        });
      }

      res.status(200).json({
        success: true,
        available_services: services,
      });
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch services.",
        error: error.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Service ID is required",
        });
      }

      const service = await Service.getById(id);

      if (!service) {
        return res.status(404).json({
          success: false,
          message: `No service found with ID: ${id}`,
        });
      }

      res.status(200).json({
        success: true,
        service: service,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching service by ID",
        error: error.message,
      });
    }
  },
  getByName: async (req, res) => {
    try {
      const { name } = req.params;

      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Service name is required",
        });
      }

      const services = await Service.getByName(name);

      if (!services || services.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No services found matching: ${name}`,
        });
      }

      res.status(200).json({
        success: true,
        total: services.length,
        results: services,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error searching service by name",
        error: error.message,
      });
    }
  },
  create: async (req, res) => {
    try {
      const { service_name, price_per_kilo, description } = req.body;

      if (!service_name || !price_per_kilo || !description) {
        return res.status(400).json({
          success: false,
          message:
            "All fields (service_name, price_per_kilo, description) are required",
        });
      }
      const newService = await Service.create({
        service_name,
        price_per_kilo,
        description,
      });

      res.status(201).json({
        success: true,
        message: "Service created successfully",
        newService: newService,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

export default serviceController;
