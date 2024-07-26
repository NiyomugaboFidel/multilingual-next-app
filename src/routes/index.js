import express from "express";
import cart from "./cart.routes";

const routes = express.Router();

routes.use("/carts", cart);

export default routes;
