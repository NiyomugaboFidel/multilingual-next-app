import { Sequelize } from "sequelize";
import config  from "./config.json";

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