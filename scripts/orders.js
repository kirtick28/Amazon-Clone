import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { orders } from '../data/orders.js';
import { getProduct,loadProductsFetch } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { cart } from '../data/cart-class.js';

async function loadOrderPage(){
    await loadProductsFetch();
    let ordersHtml = '';
    orders.forEach((order) =>{
        const orderDate = dayjs(order.orderTime).format("MMMM DD");
        ordersHtml += `
            <div class="order-container">          
                <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${orderDate}</div>
                    </div>
                    <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${formatCurrency(order.totalCostCents)}</div>
                    </div>
                </div>

                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.id}</div>
                </div>
                </div>

                <div class="order-details-grid">
                    ${productsListHtml(order)}                
                </div>
            </div>
        `;
    });

    function productsListHtml(order){
        let productDetailsHtml = '';
        
        order.products.forEach((productDetails)=>{
            const matchingProduct =  getProduct(productDetails.productId);
            productDetailsHtml +=`
                <div class="product-image-container">
                    <img src="${matchingProduct.image}">
                </div>

                <div class="product-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-delivery-date">
                    Arriving on: ${dayjs(productDetails.estimatedDeliveryTime).format('MMMM DD')}
                    </div>
                    <div class="product-quantity">
                    Quantity: ${productDetails.quantity}
                    </div>
                    <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message js-buy-it-again" data-product-id=${productDetails.productId}>Buy it again</span>
                    </button>
                </div>

                <div class="product-actions">
                    <a href="tracking.html?orderId=${order.id}&productId=${matchingProduct.id}">
                    <button class="track-package-button button-secondary">
                        Track package
                    </button>
                    </a>
                </div>
            `;
        });
        return productDetailsHtml;
    }
    document.querySelector('.js-orders-grid').innerHTML = ordersHtml;
    
    document.querySelectorAll('.js-buy-it-again')
    .forEach((button)=>{
            button.addEventListener('click',()=>{
            const productId = button.dataset.productId;
            cart.addToCart(productId,1);
            updateHeaderCart();
        })
    })

    function updateHeaderCart(){
        const quantity = cart.calculateCartQuantity();
        document.querySelector('.js-order-cart-quantity').innerHTML = quantity;
    }
    updateHeaderCart();
}

loadOrderPage();