function Cart(localStorageKey) {
  const cart = {
    cartItems: [],

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
    },

    deleteFromCart(productId) {
      const newCart = this.cartItems.filter(
        (cartItem) => cartItem.productId !== productId
      );

      this.cartItems.length = 0;
      this.cartItems.push(...newCart);

      this.saveCart();
    },

    updateTheCart(productId, updatedQuantity) {
      const matchingItem = this.cartItems.find(
        (cartItem) => cartItem.productId === productId
      );

      if (matchingItem) {
        matchingItem.quantity = updatedQuantity;
        this.saveCart();
      }
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      const matchingItem = this.cartItems.find(
        (cartItem) => cartItem.productId === productId
      );

      if (matchingItem) {
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveCart();
      }
    },

    loadCart() {
      return JSON.parse(localStorage.getItem(localStorageKey)) || [];
    },

    saveCart() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');
// Initialize cart items when the object is created
cart.cartItems = cart.loadCart();
businessCart.cartItems = businessCart.loadCart();

console.log(cart);
console.log(businessCart);
