function loadCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Use this to get the cart
export const cart = loadCart();

// Use this to add items
export function addToCart(productId, selectedQuantity) {
  const matchingItem = cart.find(
    (cartItem) => cartItem.productId === productId
  );

  if (matchingItem) {
    matchingItem.quantity += selectedQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: selectedQuantity,
    });
  }

  saveCart(cart);
}


export function deleteFromCart(productId){
  const newCart = cart.filter((cartItem) => cartItem.productId !== productId);

  cart.length = 0;
  cart.push(...newCart);

  saveCart(cart);
  
}
