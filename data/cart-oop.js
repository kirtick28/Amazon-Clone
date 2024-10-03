function Cart(localStorageKey){
    const cart = {
        cartItems : JSON.parse(localStorage.getItem(localStorageKey)) || [],
        saveToLocal(){
            localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
        },
        findItem(productId){
            let matchingProduct;
            this.cartItems.forEach(cartItem => {
                if(cartItem.productId == productId){
                    matchingProduct = cartItem;
                }
            })
            return matchingProduct;
        },
        addToCart(productId){
            const deliveryOptionId = 1;
            const quantity = Number(document.querySelector(`.js-product-quantity-${productId}`).value);
            let matchingProduct = this.findItem(productId);
            if(matchingProduct){
                matchingProduct.quantity += quantity;
            }
            else{
                this.cartItems.push({
                    productId,
                    quantity,
                    deliveryOptionId
                });
            }
            this.saveToLocal();
        },
        calculateCartQuantity(){
            let quantity = 0;
            this.cartItems.forEach((cartItem)=>{
                quantity += cartItem.quantity;
            })
            return quantity;
        },
        removeFromCart(productId){
            let ind = -1;
            this.cartItems.forEach((cartItem,index) =>{
                if(cartItem.productId == productId){
                    ind = index;
                }
            })
            if(ind !== -1){
                this.cartItems.splice(ind,1);
            }
            this.saveToLocal();
        },
        updateCartQuantity(productId, newQuantity){
            const matchingProduct = this.findItem(productId);
            matchingProduct.quantity = newQuantity;
            this.saveToLocal();
        },
        updateDeliveryOptionId(productId,deliveryOptionId){
            const matchingProduct = this.findItem(productId);
            matchingProduct.deliveryOptionId = deliveryOptionId;
            this.saveToLocal();
        }
    }
    return cart;
}

const cart = Cart('cart-oop');
console.log(cart);