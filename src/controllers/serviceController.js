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
};

export default serviceController;
