checkoutHtml = '';

cart.forEach(cartItem => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    checkoutHtml += `
    <div class="cart-item-container js-cart-item-container-${productId}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${(matchingProduct.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity js-product-quantity-${productId} ">
                    <span>
                    Quantity: <span class="quantity-label quantity-label-${productId}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id=${productId}>
                    Update
                    </span>
                    
                    <input class="input-quantity input-quantity-${productId}" type="number">
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
                <div class="delivery-option">
                    <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-1">
                    <div>
                        <div class="delivery-option-date">
                            Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                            FREE Shipping
                        </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1">
                    <div>
                        <div class="delivery-option-date">
                            Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                            $4.99 - Shipping
                        </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1">
                    <div>
                        <div class="delivery-option-date">
                            Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                            $9.99 - Shipping
                        </div>
                    </div>
                </div>
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
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
        updateCheckoutQuantity();
    })
})

document.querySelectorAll('.js-update-link')
.forEach((link)=>{
    link.addEventListener("click", () =>{
        const productId = link.dataset.productId;
        document.querySelector(`.input-quantity-${productId}`).value = document.querySelector(`.quantity-label-${productId}`).innerHTML;
        document.querySelector(`.js-product-quantity-${productId}`).classList.add('js-product-quantity');
    })
})
document.querySelectorAll('.js-save-link')
.forEach((link)=>{
    link.addEventListener("click", () =>{
        const productId = link.dataset.productId;
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
        updateCheckoutQuantity();
    })
})

function updateCheckoutQuantity(){
    document.querySelector('.js-checkout-quantity').innerHTML = `${calculateCartQuantity()} items`;
}

updateCheckoutQuantity();