import Service from "../models/serviceModel.js";

const serviceController = {
  getAll: async (req, res) => {
    const services = await Service.getAll();
    res.status(200).json({
      success: true,
      available_services: services,
    });
  },
};

export default serviceController;
