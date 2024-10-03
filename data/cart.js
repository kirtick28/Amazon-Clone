export const cart = JSON.parse(localStorage.getItem('cart')) || []

export function findItem(productId){
    let matchingProduct;
    cart.forEach(cartItem => {
        if(cartItem.productId == productId){
            matchingProduct = cartItem;
        }
    })
    return matchingProduct;
}
export function addToCart(productId){
    const deliveryOptionId = 1;
    const quantity = Number(document.querySelector(`.js-product-quantity-${productId}`).value);
    let matchingProduct = findItem(productId);
    if(matchingProduct){
        matchingProduct.quantity += quantity;
    }
    else{
        cart.push({
            productId,
            quantity,
            deliveryOptionId
        });
    }
    saveToLocal();
}

export function calculateCartQuantity(){
    let quantity = 0;
    cart.forEach((cartItem)=>{
        quantity += cartItem.quantity;
    })
    return quantity;
}

export function removeFromCart(productId){
    let ind = -1;
    cart.forEach((cartItem,index) =>{
        if(cartItem.productId == productId){
            ind = index;
        }
    })
    if(ind !== -1){
        cart.splice(ind,1);
    }
    saveToLocal();
}

export function updateCartQuantity(productId, newQuantity){
    const matchingProduct = findItem(productId);
    matchingProduct.quantity = newQuantity;
    saveToLocal();
}

export function updateDeliveryOptionId(productId,deliveryOptionId){
    const matchingProduct = findItem(productId);
    matchingProduct.deliveryOptionId = deliveryOptionId;
    saveToLocal();
}

export function saveToLocal(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
