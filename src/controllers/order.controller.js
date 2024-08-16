import Orders from "../database/models/orders";
import { getCartProducts } from "../services/cart.service";
import OrderAddresses from "../database/models/orderaddress";
import User from "../database/models/user";
import countryCode from "../utils/data";
const dotenv = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const DOMAIN = process.env.DOMAIN || "http://localhost:5173";

const createOrder = async (req, res) => {
  try {
    const user = req.user;
    const cart = req.cart;
    const userId = req.user.id;
    // console.log(req.user, {userId});

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

    const orderItems = productInfo.map((product, index) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: products[index].quantity,
      images: product.images,
      sellerId: product.sellerId,
    }));
    const cartProduct = orderItems.map((item)=>{
      return{
        id:item.id,
        quantity:item.quantity
      }
    })

    const customer = await stripe.customers.create({
      metadata: {
        userId,
        products:JSON.stringify(orderItems)
      },
    });



    let line_items = orderItems.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.images[0]],
            metadata: {
              id: item.id,
              sellerId: item.sellerId,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: countryCode,
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      customer: customer.id,
      line_items,
      mode: "payment",
      success_url: `${DOMAIN}/success`,
      cancel_url: `${DOMAIN}/failure`,
    });

    res.status(303).json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// create Oder
const storeOrder = async (customer, data) => {
  try {
    const Items = JSON.parse(customer.metadata.products);
    // const productInfo = await getCartProducts(Items.id);
    let paymentInfo;
    paymentInfo = JSON.stringify({
      status: data.payment_status,
      customer: data.customer_details,
      paymentIntentId: data.payment_intent,
      subtotalAmount: data.amount_subtotal,
      totalAmount: data.amount_total,
    });



    //  const shipping = [{shipping_details:data.shipping_details},{shipping_cost:data.shipping_cost / 100}]
    const newOrder = new Orders({
      products:Items,
      userId: customer.metadata.userId,
      customerId: data.customer,
      paymentIntentId: data.payment_intent,
      subtotalAmount: data.amount_subtotal,
      totalAmount: data.amount_total,
      shipping: data.shipping_details,
      shippingCost: data.shipping_cost,
      transportAmount: data.shipping_cost.amount_total / 100,
      customer: data.customer_details,
      paymentInfo: JSON.parse(paymentInfo),
      payment_status: data.payment_status,
    });

    const savedOrder = await newOrder.save();
    console.log("Proccessed Order", savedOrder);
  } catch (error) {
    console.log(error.message);
  }
};

// strip webhook

// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;
//  endpointSecret = "whsec_163947b4d29f14c215dd57bd2703f69267b640904b1f0feae8293a50cb8e4084";

const webhookStript = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let data;
  let eventType;

  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Webhook verified");
    } catch (err) {
      console.log(`Webhook Error:${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // handle the event
  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        console.log(customer);
        console.log(`Data`, data);
        storeOrder(customer, data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  // Return a 200 res to acknowledge receipt of the event
  res.send().end();
};

const addOrderAddress = async (req, res) => {
  try {
    const orderId = req.params.id;

    const userId = req.user.id;

    const { street, province, district, city, pobox, country, phoneNo, email } =
      req.body;
    // console.log('addorderAddress',{street,province,district,city,pobox,country,phoneNo,email});

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const order = await Orders.findOne({ where: { id: orderId, userId } });
    console.log(order);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const orderAddress = await OrderAddresses.findOne({ where: { orderId } });

    let billingAddress;
    billingAddress = JSON.stringify({
      province,
      country,
      district,
      street,
      phoneNo,
      email,
      city,
      pobox,
    });
    console.log({ orderAddress });
    if (orderAddress) {
      const updatedOrderAdress = await OrderAddresses.update(
        {
          billingAddress: JSON.parse(billingAddress),
          shipping:order.shipping
        },
        {
          where: {
            id: orderAddress.id,
            orderId,
          },
        }
      );
      await orderAddress.save();
      return res.status(200).json({
        success: true,
        message: "Order Address updated successfully",
        orderAddress: JSON.parse(billingAddress),
      });
    }
    const newOrderAddress = new OrderAddresses({
      billingAddress: JSON.parse(billingAddress),
      orderId,
      shipping:order.shipping
    });

    await newOrderAddress.save();
    return res.status(200).json({
      success: true,
      message: "Order Address added successfully",
      orderAddress: newOrderAddress,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message.replace(/[^a-zA-Z0-9 ]/g, ""),
    });
  }
};

const getOrderPerId = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.id;


    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const order = await Orders.findOne({ where: { id: orderId, userId } });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }


    return res.status(200).json({
      success: true,
      message: "get all Orders successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message.replace(/[^a-zA-Z0-9 ]/g, ""),
    });
  }
};

const getOrders = async (req, res) => {
  try {

    const orders = await Orders.findAll();

    if (orders === null) {
      return res.status(200).json({
        success: true,
        message: "Order store is Empity",
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "get all Orders successfully",
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message.replace(/[^a-zA-Z0-9 ]/g, ""),
    });
  }
};

export {getOrderPerId, getOrders, addOrderAddress, createOrder, webhookStript };
