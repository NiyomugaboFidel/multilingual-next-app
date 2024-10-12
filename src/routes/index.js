import express from "express";
import cart from "./api/cart.routes";
import category from './api/category.routes'
import wishlist from './api/wishlist.routes'
import orders from './api/productOrders.routes'
import Auth from './api/user.routes'
import notifications from './api/notification.routes'
import AuthGoogle from './api/user.authgoogle.routes'
import ProductRoutes from './api/product.routes'

const routes = express.Router();
routes.use('/user',Auth);
routes.use('/',AuthGoogle);
routes.use("/carts", cart);
routes.use("/products",ProductRoutes)
routes.use("/products/category", category);
routes.use("/products/wish", wishlist);
routes.use("/products/order", orders);
routes.use("/notification", notifications);

export default routes;
