import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Laundry Management API",
      version: "1.0.0",
      description: `The Laundry Management System API is a backend service built using Javascript. This system automates customer records, order tracking, and payment management for laundry shop operations.
        \n Developed by GitDefenders`,
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT ?? 3000}`,
      },
    ],
  },
  apis: ["./src/routes/*.js"], // file na may jsdoc comments
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
