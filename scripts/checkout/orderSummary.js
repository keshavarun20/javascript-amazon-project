import {
  cart,
  deleteFromCart,
  updateTheCart,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummery } from "./paymentSummary.js";

const cartItemElem = document.querySelector(".order-summary");

export function renderOrderSummery() {
  document.querySelector(".js-return-to-home-link").innerHTML = `${cart.length} Items`;
  let cartHTML = "";

  if (cart.length === 0) cartHTML = "Cart is Empty";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const matchingDeliveryDate = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(matchingDeliveryDate.deliveryDays, "days");
    const deliveryDateString = deliveryDate.format("dddd, MMMM D");

    cartHTML += `
  <div class="cart-item-container js-cart-item-container-${
    matchingProduct.id
  } js-date-change">
    <div class="delivery-date">
      Delivery date: ${deliveryDateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}"
        alt="product-image">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link" data-product-id="${
            matchingProduct.id
          }">
            Update
          </span>
          <input type="number" min="1" class="quantity-input js-quantity-input-${
            matchingProduct.id
          }" style="display:none;" value="${cartItem.quantity}" />
          <span class="save quantity-link link-primary js-save-link" style="display:none;" data-product-id="${
            matchingProduct.id
          }">
            Save
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
            matchingProduct.id
          }">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct, cartItem)}
      </div>
    </div>
  </div>
`;
  });

  cartItemElem.innerHTML = cartHTML;

  const deleteCartItemElem = document.querySelectorAll(".js-delete-link");
  const updateCartItemElem = document.querySelectorAll(".js-update-link");

  deleteCartItemElem.forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      deleteFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      container.remove();
      renderPaymentSummery();

      if (cart.length === 0) {
        cartItemElem.innerHTML = "<p class='empty-message'>Cart is Empty</p>";
      }
    });
  });

  updateCartItemElem.forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      if (link.querySelector("input.update-input")) return;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      const inputElem = container.querySelector(".quantity-input");
      const saveBtn = container.querySelector(".save");

      // Show input and Save button, hide Update link
      link.style.display = "none";
      inputElem.style.display = "inline-block"; // or "block"
      saveBtn.style.display = "inline-block";
    });
  });

  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      const newQuantity = Number(quantityInput.value);

      updateTheCart(productId, newQuantity);
      renderPaymentSummery();

      const quantityLabel = container.querySelector(".quantity-label");
      quantityLabel.innerText = newQuantity;

      // ✅ Hide input and Save, show Update link again
      quantityInput.style.display = "none";
      link.style.display = "none";

      const updateLink = container.querySelector(".js-update-link");
      updateLink.style.display = "inline-block";
    });
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const deliveryDateString = deliveryDate.format("dddd, MMMM D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE Shipping"
          : `$${formatCurrency(deliveryOption.priceCents)} - Shipping`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
    <div class="delivery-option js-delivery-option"
    data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
      <input type="radio"
        ${isChecked ? "checked" : ""}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${deliveryDateString}
        </div>
        <div class="delivery-option-price">
          ${priceString}
        </div>
      </div>
    </div>
        `;
    });

    return html;
  }

  document.querySelectorAll(".js-delivery-option").forEach((radio) => {
    radio.addEventListener("click", () => {
      const productId = radio.dataset.productId;
      const deliveryOptionId = radio.dataset.deliveryOptionId;

      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummery();
      renderPaymentSummery();
    });
  });
}
