import { renderOrderSummary } from "./Checkout/orderSummary.js";
import { renderPaymentSummary } from "./Checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart-class.js";

async function loadPage(){
    await loadProductsFetch();
    await loadCart();
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

// Promise.all([
//     loadProductsFetch(),
//     new Promise((resolve)=>{
//         loadCart(()=>{
//             resolve();
//         });
//     })
// ]).then(()=>{
//     
// })
