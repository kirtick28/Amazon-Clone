import { findOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadTrackingPage(){
    await loadProductsFetch();
    const url = new URL(window.location.href);
    const orderID = url.searchParams.get('orderId');
    const productID = url.searchParams.get('productId');

    const matchingOrder = findOrder(orderID);
    const matchingProduct = getProduct(productID);

    let productDetails;

    matchingOrder.products.forEach(prod => {
        if(prod.productId==productID)
            productDetails=prod;
    });
    
    let trackingHtml = `  
        <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
        </a>
        <div class="delivery-date">
            Arriving on ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')}
        </div>

        <div class="product-info">
            ${matchingProduct.name}
        </div>

        <div class="product-info">
            Quantity: ${productDetails.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
            <div class="progress-label">
                Preparing
            </div>
            <div class="progress-label current-status">
                Shipped
            </div>
            <div class="progress-label">
                Delivered
            </div>
        </div>

        <div class="progress-bar-container">
            <div class="progress-bar"></div>
        </div>
    `;

    document.querySelector('.js-order-tracking').innerHTML=trackingHtml;
}

loadTrackingPage();