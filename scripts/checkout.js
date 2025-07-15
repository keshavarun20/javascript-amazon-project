import { renderOrderSummery } from "./checkout/orderSummary.js";
import { renderPaymentSummery } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartss } from "../data/cart.js";
//import "../data/cart-oop.js";
//import '../data/be.js'

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCartss(() => {
      resolve();
    });
  }),
]).then(() => {
  renderOrderSummery();
  renderPaymentSummery();
});

// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve();
//   });
// }).then(() => {
//   return new Promise((resolve) => {
//     loadCartss(() => {
//       resolve();
//     });
//   }).then(() => {
//     renderOrderSummery();
//     renderPaymentSummery();
//   });
// });
// loadProducts(() => {
//   loadCartss(()=>{ //Call Back Hell
//
//   })
// });
