amazonHtml = '';
const prevAddedTimers = {};

products.forEach((product) => {
    amazonHtml += `
        <div class="product-container">
            <div class="product-image-container">
            <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
            ${product.name}
            </div>

            <div class="product-rating-container">
            <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
            </div>

            <div class="product-price">
            $${product.priceCents/100}
            </div>

            <div class="product-quantity-container">
            <select class="js-product-quantity-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
            </button>
        </div>
    `;
})

document.querySelector('.js-product-grid').innerHTML = amazonHtml;

document.querySelectorAll('.js-add-to-cart')
.forEach((button) => {
    button.addEventListener("click", () =>{
        const productId = button.dataset.productId;
        displayAdded(productId);
        addToCart(productId);
        updateCartQuantity();
        saveToLocal();
    })
})

function displayAdded(productId){
    const added =  document.querySelector(`.js-added-to-cart-${productId}`);
    added.classList.add('js-visible');
    const prevTimer = prevAddedTimers[productId];
    if(prevTimer){
        clearTimeout(prevTimer);
    }
    const currTimer = setTimeout(()=>{
        added.classList.remove('js-visible');
    },2000);
    prevAddedTimers[productId] = currTimer;
}

function updateCartQuantity(){  
    document.querySelector('.cart-quantity').innerHTML = calculateCartQuantity();
}

updateCartQuantity();