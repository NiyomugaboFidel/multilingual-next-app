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
// import productCategoryRoute from'./routes/api/category.routes'
import allRoute from './routes/index'

// declaretions

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

// middlewares
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(googleAuthRoute);
app.use('/users', userRouter);
// app.use('/products/category',productCategoryRoute);
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

// Route to upload and resize product images
app.post('/upload/products', uploadPhoto.array('images', 10), productImageResize, (req, res) => {
  return res.status(200).json({ message: 'Product images uploaded and resized successfully' });
});

// Route to upload and resize blog images
app.post('/upload/blogs', uploadPhoto.array('images', 10), blogImageResize, (req, res) => {
  return res.status(200).json({ message: 'Blog images uploaded and resized successfully' });
});
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
export default server