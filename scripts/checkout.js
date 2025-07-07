import { cart, deleteFromCart, updateTheCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

const cartItemElem = document.querySelector(".order-summary");
let cartHTML = "";

if (cart.length === 0) cartHTML = "Cart is Empty";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  const matchingProduct = products.find((product) => product.id === productId);

  cartHTML += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
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
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
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

    updateTheCart(productId,newQuantity);

    const quantityLabel = container.querySelector(".quantity-label");
    quantityLabel.innerText = newQuantity;

    // ✅ Hide input and Save, show Update link again
    quantityInput.style.display = "none";
    link.style.display = "none";

    const updateLink = container.querySelector(".js-update-link");
    updateLink.style.display = "inline-block";

  });
});
