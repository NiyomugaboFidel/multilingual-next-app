// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Authentication and User Management API',
        version: '1.0.0',
        name:'VIRUNGA ONLINE SHOP',
        description: 'APIs for user authentication and profile management of VIRUNGA',
      },
    },
    apis: ['./swagger/swagger.yaml'], // Path to the API files
  };
  
  

  export default swaggerOptions