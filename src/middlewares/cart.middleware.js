import Cart from "../database/models/cart";
import Product from "../database/models/product";
import { findProductById } from "../services/product.service";

const getUsercart = async (req, res, next) => {
  const userId = req.user.id;
  const userCart = await Cart.findOne({ where: { userId } });
  req.cart = userCart;
  next();
};

const isProductAvailable = async (req, res, next) => {
  const { productId } = req.body;
  const product = await findProductById(productId);
  if (!product) {
    return res.status(400).json({ message: 'This product does not exist' });
  }

  if (!product.isAvailable) {
    return res.status(400).json({ message: 'This product is not available' });
  }
  next();
};

const isProductExpired = async (req, res, next) => {
  const { productId } = req.body;
  const product = await findProductById(productId);
  if (!product) {
    return res.status(400).json({ message: "This product does not exist" });
  }

  if (product.isExpired) {
    return res.status(400).json({ message: 'This product is expired' });
  }
  next();
};

const checkProductInCart = async (req, res, next) => {
  const cart = req.cart;
  const { productId } = req.params;
  if (!cart) {
    return next();
  }
  const products = cart.products;
  const existingProduct = products.find((p) => p.productId === productId);
  if (!existingProduct) {
    return res.status(404).json({ message: 'Product not in cart' });
  }
  next();
};

const addProductToCart = async (req, res, next) => {
  const cart = req.cart;
  const { productId } = req.body;
  const productQuantity = req.body.productQuantity || 1;

  if (!cart) {
    return next();
  }

  const products = cart.products;
  const existingProduct = products.find((p) => p.productId === productId);

  if (existingProduct) {
    // Update the quantity of the existing product in the cart
    const newQuantity = existingProduct.quantity + productQuantity;
    const product = await findProductById(productId);

    if (product.quantity >= newQuantity) {
      existingProduct.quantity = newQuantity;
      const updateProducts = { products: cart.products };
      await Cart.update(updateProducts, { where: { id: cart.id } });
    } else {
      return res.status(400).json({ message: 'Not enough product in stock' });
    }
  } else {
    // Add the new product to the cart
    const product = await findProductById(productId);
    const newProduct = {
      quantity: productQuantity,
      productId,
      sellerId: product.sellerId,
    };
    cart.products.push(newProduct);
    const updateProducts = { products: cart.products };
    await Cart.update(updateProducts, { where: { id: cart.id } });
  }

  req.cart = cart;
  next();
};

export {
  getUsercart,
  isProductAvailable,
  isProductExpired,
  checkProductInCart,
  addProductToCart,
};
