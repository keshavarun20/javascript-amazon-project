import { renderOrderSummery } from "../../scripts/checkout/orderSummary.js";
import { cart } from "../../data/cart.js";

describe("test suite: renderOrderSummary", () => {
  //spyOn(localStorage, "setItem");
  it("displays the cart", () => {
    cart;
    document.querySelector(".js-test-container").innerHTML = `
    <div class ='order-summary'></div>
    `;
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
      ]);
    });
    renderOrderSummery();
    //expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    //document.querySelectorAll('')
  });
});
