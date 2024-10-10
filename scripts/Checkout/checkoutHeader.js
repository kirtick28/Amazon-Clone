import { cart } from "../../data/cart-class.js";

// This method is used to render the Checkout header in checkout.html page
export function renderCheckoutHeader(){
    let cartQuantity = cart.calculateCartQuantity();
    document.querySelector('.checkout-header-middle-section').innerHTML = `Checkout (<a class="return-to-home-link" href="index.html">${cartQuantity} items</a>)`;
}
