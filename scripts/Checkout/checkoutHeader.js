import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader(){
    let cartQuantity = calculateCartQuantity();
    document.querySelector('.checkout-header-middle-section').innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${cartQuantity} items</a>)`;
}
