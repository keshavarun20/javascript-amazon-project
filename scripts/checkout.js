import { renderOrderSummery } from "./checkout/orderSummary.js";
import { renderPaymentSummery } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
//import "../data/cart-oop.js";
//import '../data/be.js'
loadProducts(() => {
  renderOrderSummery();
  renderPaymentSummery();
});
