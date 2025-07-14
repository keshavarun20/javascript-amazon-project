class Cart {
  cartItems = [];
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.cartItems = this.#loadCart();
  }

  addToCart(productId, selectedQuantity) {
    const matchingItem = this.cartItems.find(
      (cartItem) => cartItem.productId === productId
    );

    if (matchingItem) {
      matchingItem.quantity += selectedQuantity;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: selectedQuantity,
        deliveryOptionId: "1",
      });
    }

    this.saveCart();
  }

  deleteFromCart(productId) {
    const newCart = this.cartItems.filter(
      (cartItem) => cartItem.productId !== productId
    );

    this.cartItems.length = 0;
    this.cartItems.push(...newCart);

    this.saveCart();
  }

  updateTheCart(productId, updatedQuantity) {
    const matchingItem = this.cartItems.find(
      (cartItem) => cartItem.productId === productId
    );

    if (matchingItem) {
      matchingItem.quantity = updatedQuantity;
      this.saveCart();
    }
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const matchingItem = this.cartItems.find(
      (cartItem) => cartItem.productId === productId
    );

    if (matchingItem) {
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveCart();
    }
  }

  #loadCart() {
    return JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  saveCart() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }
}

const cart = new Cart("cart-oop");
const businessCart = new Cart("cart-business");

console.log(cart);
console.log(businessCart);
