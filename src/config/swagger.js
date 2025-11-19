import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Laundry Management API",
      version: "1.0.0",
      description: "API for laundry management system",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT ?? 3000}`,
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js"], // files with JSDoc comments
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
