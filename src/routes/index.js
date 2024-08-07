import express from "express";
import cart from "./cart.routes";
import category from './category.routes'

const routes = express.Router();

routes.use("/carts", cart);
routes.use("/category", category);

export default routes;
