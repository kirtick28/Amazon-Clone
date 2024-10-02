const cart = JSON.parse(localStorage.getItem('cart')) || []

function addToCart(productId){
    const quantity = Number(document.querySelector(`.js-product-quantity-${productId}`).value);
    let matchingProduct;
    cart.forEach(cartItem => {
        if(cartItem.productId == productId){
            matchingProduct = cartItem;
        }
    })
    if(matchingProduct){
        matchingProduct.quantity += quantity;
    }
    else{
        cart.push({
            productId,
            quantity
        });
    }
    console.log(cart);
}

function saveToLocal(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

function calculateCartQuantity(){
    let quantity = 0;
    cart.forEach((cartItem)=>{
        quantity += cartItem.quantity;
    })
    return quantity;
}