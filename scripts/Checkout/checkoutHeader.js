import { cart } from "../../data/cart-class.js";

export function renderCheckoutHeader(){
    let cartQuantity = cart.calculateCartQuantity();
    document.querySelector('.checkout-header-middle-section').innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${cartQuantity} items</a>)`;
}
