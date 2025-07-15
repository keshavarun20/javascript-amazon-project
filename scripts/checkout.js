import { renderOrderSummery } from "./checkout/orderSummary.js";
import { renderPaymentSummery } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartss } from "../data/cart.js";
//import "../data/cart-oop.js";
//import '../data/be.js'
// basically warps the code into a promise like returns a promise
await loadProductsFetch(); //await let us to write async code like a regular code
await new Promise((resolve) => {
  loadCartss(() => {
    resolve();
  });
});
renderOrderSummery();
renderPaymentSummery();
//return "value1"; // this wraps as resolve('value')

//async let us to use await
//We can only use await inside async function.

// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve) => {
//     loadCartss(() => {
//       resolve();
//     });
//   }),
// ]).then(() => {
//   renderOrderSummery();
//   renderPaymentSummery();
// });

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
