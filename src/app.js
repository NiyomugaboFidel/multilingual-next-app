//dependencies
import express from 'express';
import 'dotenv/config'
import bodyParser from 'body-parser';
import sequelize from'./database/config/sequelize'
import userRouter  from'./routes/user.routes';
import { notFound,errorHandler } from './middlewares/errorHandler';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import googleAuthRoute from'../src/routes/user.authgoogle.routes'
import swaggerUi  from'swagger-ui-express';
import swaggerJsdoc from'swagger-jsdoc';
import swaggerOptions from './swagger';
import productRoutes from './routes/product.routes'



// declaretions
const app = express();
const PORT  = process.env.PORT || 6000





const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//ejs for test
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));


// Initialize session middleware
app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false,
 
 }));
 // Error handling middleware (optional)
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({ error: 'Server error' });
 });

// middlewares
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(googleAuthRoute);
app.use('/users', userRouter);
app.use('/products', productRoutes);

app.use(passport.initialize());
app.use(passport.session());
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