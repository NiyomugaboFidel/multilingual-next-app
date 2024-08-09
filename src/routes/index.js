import express from "express";
import cart from "./api/cart.routes";
import category from './api/category.routes'
import wishlist from './api/wishlist.routes'
import orders from './api/productOrders.routes'

const routes = express.Router();

routes.use("/carts", cart);
routes.use("/products/category", category);
routes.use("/products/wish", wishlist);
routes.use("/products/order", orders);

export default routes;
