import Orders from "../database/models/orders";
import { getCartProducts } from "../services/cart.service";
import calculateProductTotalPrice from "../utils/cart";
import orderItems from "../database/models/orderitems";

const orderCheckOut = async (req, res) => {
  try {
    const user = req.user;
    const cart = req.cart;

    const { products } = cart;
    if (!products) {
      return res.status(400).json({
        success: true,
        message: "No product added in cart. Please add cart before order.",
        error: error.message.replace(/[^a-zA-Z0-9 ]/g, ""),
      });
    }

    const productId = products.map((p) => p.productId);
    const productInfo = await getCartProducts(productId);

    const productAllInfo = productInfo.map((product, index) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: products[index].quantity,
      images: product.images,
      sellerId: product.sellerId,
    }));
    const totalPrice = calculateProductTotalPrice(productAllInfo);

    const oldOrder = await Orders.findOne({
      where: { userId: user.id },
    });

    let orderItem;

    if (oldOrder) {
      orderItem = await orderItems.findOne({ where: { orderId: oldOrder.id } });

      if (!orderItem) {
        const newOrderItems = {
          orderId: oldOrder.id,
          products: productAllInfo,
        };
        orderItem = await orderItems.create(newOrderItems);
      }

      oldOrder.transportAmount = 0;
      oldOrder.totalAmount = totalPrice;

      orderItem.orderId = oldOrder.id;
      orderItem.products = productAllInfo;

      await Promise.all([oldOrder.save(), orderItem.save()]);
      return res.status(201).json({
        success: true,
        message: "Order created succefully",
        orderItem,
        order:oldOrder
      });
    } else {
      const newOrder = {
        userId: user.id,
        transportAmount: 0,
        totalAmount: totalPrice,
      };
      const order = await Orders.create(newOrder);

      if (!order) {
        return res.status(201).json({
          success: true,
          message: "Create order failed",
        });
      }
      const newOrderItems = {
        orderId: order.id,
        products: productAllInfo,
      };
      orderItem = await orderItems.create(newOrderItems);

      return res.status(201).json({
        success: true,
        message: "Order created succefully",
        orderItem,
        order:order
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message.replace(/[^a-zA-Z0-9 ]/g, ""),
    });
  }
};

const addOrderAddress = async(req, res)=>{

    try {
        console.log('addorderAddress',req.body);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Something went wrong!",
          error: error.message.replace(/[^a-zA-Z0-9 ]/g, ""),
        });
    }

}

export { orderCheckOut, addOrderAddress };
