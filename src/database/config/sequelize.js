import { Sequelize } from "sequelize";
import config  from "./config.local.json";

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env]
const sequelize = new Sequelize(dbConfig.database,dbConfig.username,dbConfig.password,{
    host:dbConfig.host, 
    dialect:dbConfig.dialect
});

const connection = async()=>{
 try {
    await sequelize.authenticate();
    console.log('database connected successfully');
 } catch (error) {
    console.log('Failed to connect to db', error);
 }
};

connection();

export default sequelize

// import { Sequelize } from "sequelize";

// const DATABASE_URL =
//   "postgresql://root:qw0cAWt0PaqkWlzfH6QncRKBeDafRmxQ@dpg-cstk09m8ii6s73fjkfrg-a.oregon-postgres.render.com/test_database_tfa0";

// // Create a new Sequelize instance using the connection URL
// const sequelize = new Sequelize(DATABASE_URL, {
//   dialect: "postgres", // Explicitly specify the dialect
//   dialectOptions: {
//     ssl: {
//       require: true, // Ensure SSL is used for secure connections
//       rejectUnauthorized: false, // Disable certificate validation if needed
//     },
//   },
//   logging: false, // Disable SQL query logging (optional)
// });

// // Test the connection
// const connectToDatabase = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Database connected successfully.");
//   } catch (error) {
//     console.error("Failed to connect to the database:", error);
//   }
// };

// // Call the connection function
// connectToDatabase();

// export default sequelize;
