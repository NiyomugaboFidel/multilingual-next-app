//dependencies
import express from 'express';
import 'dotenv/config'
import bodyParser from 'body-parser';
import sequelize from'./database/config/sequelize'
import userRouter  from'./routes/user.routes';
import { notFound,errorHandler } from './middlewares/errorHandler';
import cookieParser from 'cookie-parser';


// declaretions
const app = express();
const PORT  = process.env.PORT || 6000

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/users', userRouter);

app.use(notFound);
app.use(errorHandler);

// test connection
export const connection = async()=>{
    try {
       await sequelize.authenticate();
       console.log('database connected successfully');
    } catch (error) {
       console.log('Failed to connect to db', error);
    }
   };

app.get('*',(req, res)=>{
 res.send('Not Found 404')
});


export default app