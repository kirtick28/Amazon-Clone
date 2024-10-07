import { renderOrderSummary } from "./Checkout/orderSummary.js";
import { renderPaymentSummary } from "./Checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart-class.js";

Promise.all([
    new Promise((resolve)=>{
        loadProducts(()=>{
            resolve();
        });
    }),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })
]).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
})
