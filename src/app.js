// ------------------------ DEPENDENCIES ------------------------
import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import sequelize from './database/config/sequelize';
import { notFound, errorHandler } from './middlewares/errorHandler';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import googleAuthRoute from '../src/routes/api/user.authgoogle.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './swagger';
import cors from 'cors';
import allRoute from './routes/index';
import { app, server } from './events/socket/socket';

// ------------------------ DECLARATIONS ------------------------
const PORT = process.env.PORT || 6000;
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// ------------------------ CONFIGURATION ------------------------

// Serve Swagger documentation
const corsOptions = {
  origin: '*', // Replace with your frontend URL
  optionsSuccessStatus: 200,
  credentials: true,
};

// Middlewares for static files and body parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

// EJS setup for testing purposes
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Initialize session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// ------------------------ ROUTES ------------------------

// Serve Swagger documentation at '/api-docs'
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve the dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Google Authentication route
app.use(googleAuthRoute);

// Test route
app.post('/home', (req, res) => {
  res.json({ greet: 'hello', message: req.body });
});
// Custom error-handling middleware
app.use(notFound);
app.use(errorHandler);
// Main API routes
app.use('/api/v1/', allRoute);

// ------------------------ ERROR HANDLING ------------------------



// Test database connection
export const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Failed to connect to database:', error);
  }
};

// Catch-all route for 404 errors
app.get('*', (req, res) => {
  res.send('Not Found 404');
});

// ------------------------ SERVER SETUP ------------------------
export default server;
