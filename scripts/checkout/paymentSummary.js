import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export function renderPaymentSummery() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const shipping = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += shipping.priceCents;
  });

  const totalPriceCentsBeforeTax = productPriceCents + shippingPriceCents;

  const estimatedTaxCents = totalPriceCentsBeforeTax * 0.1;

  const orderTotal = totalPriceCentsBeforeTax + estimatedTaxCents;

  const paymentSummaryHTML = `
  <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">$${(productPriceCents / 100).toFixed(
        2
      )}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${(shippingPriceCents / 100).toFixed(
        2
      )}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${(
        totalPriceCentsBeforeTax / 100
      ).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${(estimatedTaxCents / 100).toFixed(
        2
      )}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${(Math.round(orderTotal) / 100).toFixed(2)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  const paymentSummaryHTMLElem = document.querySelector(".payment-summary");

  paymentSummaryHTMLElem.innerHTML = paymentSummaryHTML;
}
