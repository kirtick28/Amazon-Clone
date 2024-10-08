import { renderOrderSummary } from "./Checkout/orderSummary.js";
import { renderPaymentSummary } from "./Checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart-class.js";

async function loadPage(){
    try{
        await Promise.all([
            loadProductsFetch(),
            loadCartFetch()
        ])
        renderOrderSummary();
        renderPaymentSummary();
    }
    catch(error){
        console.log("Unexpected Error. Please try again later");
    }
}
loadPage();
