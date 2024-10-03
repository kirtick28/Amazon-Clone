import { cart, removeFromCart, updateCartQuantity, updateDeliveryOptionId} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption , deliveryOptions} from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';
import { calculateDeliveryDate } from '../../data/deliveryOptions.js';

export function renderOrderSummary(){
    let checkoutHtml = '';

    cart.forEach(cartItem => {
        const productId = cartItem.productId;
        const matchingProduct = getProduct(productId);
        const matchingOption = getDeliveryOption(cartItem.deliveryOptionId);
        checkoutHtml += `
        <div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date">
                Delivery date: ${calculateDeliveryDate(matchingOption)}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity js-product-quantity-${productId} ">
                        <span>
                        Quantity: <span class="quantity-label quantity-label-${productId}">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-link" data-product-id=${productId}>
                        Update
                        </span>
                        
                        <input class="input-quantity input-quantity-${productId}" type="number" data-product-id=${productId}>
                        <span class="save-quantity-link link-primary js-save-link" data-product-id=${productId}>Save</span>

                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${productId}>
                        Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${addOptions(productId,cartItem)}
                </div>
            </div>
        </div>
        ` 
    });

    document.querySelector('.order-summary').innerHTML = checkoutHtml;

    document.querySelectorAll('.js-delete-link')
    .forEach(button =>{
        button.addEventListener("click",() => {
            const productId = button.dataset.productId;
            removeFromCart(productId);
            renderOrderSummary();
            renderPaymentSummary();
        })
    })

    document.querySelectorAll('.js-update-link')
    .forEach((link)=>{
        link.addEventListener("click", () =>{
            const productId = link.dataset.productId;
            document.querySelector(`.input-quantity-${productId}`).value = document.querySelector(`.quantity-label-${productId}`).innerHTML;
            document.querySelector(`.js-product-quantity-${productId}`).classList.add('js-product-quantity');
            renderPaymentSummary();
        })
    })
    document.querySelectorAll('.js-save-link')
    .forEach((link)=>{
        link.addEventListener("click", () =>{
            const productId = link.dataset.productId;
            handleSaveQuantity(productId);
        })
    })

    document.querySelectorAll('.input-quantity')
    .forEach((input) =>{
        input.addEventListener('keyup', (event)=>{
            if(event.key == 'Enter'){
                handleSaveQuantity(input.dataset.productId);
            }
        })
    })

    function handleSaveQuantity(productId){
        const newQuantity = Number(document.querySelector(`.input-quantity-${productId}`).value);
        if(newQuantity<=0){
            removeFromCart(productId);
            document.querySelector(`.js-cart-item-container-${productId}`).remove();
        }
        else{
            updateCartQuantity(productId,newQuantity);
            document.querySelector(`.quantity-label-${productId}`).innerHTML = newQuantity;
            document.querySelector(`.js-product-quantity-${productId}`).
            classList.remove('js-product-quantity');
        }
        renderCheckoutHeader();
        renderPaymentSummary();
    }

    renderCheckoutHeader();

    function addOptions(productId,cartItem){
        let deliveryHtml = '';
        deliveryOptions.forEach((option)=>{
            const price = option.priceCents == 0 ? 'FREE' : `$${formatCurrency(option.priceCents)} -`;
            const deliveryDate = calculateDeliveryDate(option);
            const isChecked = cartItem.deliveryOptionId == option.id ? 'checked' : '';
            deliveryHtml += `
            <div class="delivery-option js-delivery-option" data-product-id=${productId} data-delivery-option-id=${option.id}>
                <input type="radio" ${isChecked}
                class="delivery-option-input"
                name="delivery-option-${productId}">
                <div>
                    <div class="delivery-option-date">
                        ${deliveryDate}
                    </div>
                    <div class="delivery-option-price">
                        ${price} Shipping
                    </div>
                </div>
            </div>
            `;
        });
        return deliveryHtml;
    }

    document.querySelectorAll('.js-delivery-option')
    .forEach((shippingOption)=>{
        shippingOption.addEventListener("click", ()=>{
            const {productId,deliveryOptionId} = shippingOption.dataset;
            updateDeliveryOptionId(productId,deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    })
}

