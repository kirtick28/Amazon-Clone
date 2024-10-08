import { cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary(){
    let totalCents = 0;
    let deliveryCents = 0;
    cart.cartItems.forEach(cartItem => {
        const product = getProduct(cartItem.productId);
        const delivery = getDeliveryOption(cartItem.deliveryOptionId);
        totalCents += product.priceCents * cartItem.quantity;
        deliveryCents += delivery.priceCents;
    });
    let totalBeforeTax = totalCents + deliveryCents;
    let tax = totalBeforeTax * 0.1;
    let totalAfterTax = totalBeforeTax + tax;
    let paymentHtml = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${cart.calculateCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(deliveryCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalAfterTax)}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
            Place your order
        </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentHtml;

    document.querySelector('.js-place-order')
    .addEventListener('click' , async () => {
        try{
            const response = await fetch('https://supersimplebackend.dev/orders',{
                method: 'POST',
                headers : {
                    'Content-Type':'application/json'
                },
                body : JSON.stringify({
                    cart: cart.cartItems
                })
            });
            const order = await response.json();
            addOrder(order);
        }catch(error){
            console.log('Unexpected error. Please try again later');
        }
        // window.location.href = 'orders.html';
    });

}


