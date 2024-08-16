//dependencies
import express from 'express';
import 'dotenv/config'
import bodyParser from 'body-parser';
import sequelize from'./database/config/sequelize'

import userRouter  from'./routes/api/user.routes';
import { notFound,errorHandler } from './middlewares/errorHandler';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import googleAuthRoute from'../src/routes/api/user.authgoogle.routes'
import swaggerUi  from'swagger-ui-express';
import swaggerJsdoc from'swagger-jsdoc';
import swaggerOptions from './swagger';
import productRoutes from './routes/api/product.routes'
import { blogImageResize, productImageResize, uploadPhoto } from './middlewares/uploadImage';
import { app, server } from './events/socket/socket';
import cors from 'cors'
// import productCategoryRoute from'./routes/api/category.routes'
import allRoute from './routes/index'

// declaretions

const PORT  = process.env.PORT || 6000





const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const corsOptions = {
  origin: '*', // Replace with your frontend URL
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
//ejs for test
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

// const __dirname = path.resolve();
// Serve static files

// Initialize session middleware
app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false,
 
 }));

  // Error handling middleware (optional)
  app.use((err, req, res, next) => {
    console.error(err.stack);
   return res.status(500).json({ error: 'Server error' });
  });
  
 // Error-handling middleware
 app.use((err, req, res, next) => {
    if (!res.headersSent) {
    return  res.status(500).json({ error: err.message });
    }
  });

  // Serve the dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// middlewares
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(googleAuthRoute);

app.post('/home',(req, res)=>{
  res.json({greet:'hello' ,message:req.body})
})

app.use('/users', userRouter);
app.use('/products', productRoutes);
app.use('/api/v1/',allRoute);

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

export default server