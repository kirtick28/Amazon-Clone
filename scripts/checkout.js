import { renderOrderSummary } from "./Checkout/orderSummary.js";
import { renderPaymentSummary } from "./Checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";

loadProducts(()=>{
    renderOrderSummary();     // Rendering Order Summary
    renderPaymentSummary();   // Rendering Payment Summary
});

