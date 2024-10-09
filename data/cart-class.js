class Cart{
    cartItems;         // Public
    #localStorageKey;  // Private

    // Constructor which initializes the value of localStorageKey and calls the private method loadFromStorage
    constructor(localStorageKey){
        this.#localStorageKey=localStorageKey;
        this.#loadFromStorage();   
    }
    
    // Loads the data stored in local storage to the cartItems(list) at the time of creation of object 
    #loadFromStorage(){     //Private Method
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    }
    
    // Used to save the data to the local storage
    saveToLocal(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
    }

    // Finds and returns the matching product in the cart by its productId
    findItem(productId){
        let matchingProduct;
        this.cartItems.forEach(cartItem => {
            if(cartItem.productId == productId){
                matchingProduct = cartItem;
            }
        })
        return matchingProduct;
    }

    // Adds the selected product to the cart or updates its quantity if it already exists
    addToCart(productId){
        const quantity = Number(document.querySelector(`.js-product-quantity-${productId}`).value);
        let matchingProduct = this.findItem(productId);
        if(matchingProduct){
            matchingProduct.quantity += quantity;
        }
        else{
            this.cartItems.push({
                productId,
                quantity,
                deliveryOptionId : "1"
            });
        }
        this.saveToLocal();
    }

    // Calculates the total quantity of items in the cart
    calculateCartQuantity(){
        let quantity = 0;
        this.cartItems.forEach((cartItem)=>{
            quantity += cartItem.quantity;
        })
        return quantity;
    }

    // Removes the product from the cart based on its productId
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
    }

    // Updates the quantity of a specific product in the cart
    updateCartQuantity(productId, newQuantity){
        const matchingProduct = this.findItem(productId);
        matchingProduct.quantity = newQuantity;
        this.saveToLocal();
    }

    // Updates the delivery option for the specified product
    updateDeliveryOptionId(productId,deliveryOptionId){
        const matchingProduct = this.findItem(productId);
        matchingProduct.deliveryOptionId = deliveryOptionId;
        this.saveToLocal();
    }

    clearCart(){
        this.cartItems = [];
        this.saveToLocal();
    }
}

//New cart which holds the cart Items and its methods
export const cart = new Cart('cart-oop');

export async function loadCartFetch(){
    try{
        const response = await fetch('https://supersimplebackend.dev/cart');
        const text = await response.text();
        console.log(text);
        return text;
    }
    catch(error){
        console.log("Unexpected Error. Please try again later");
    }
}

/*
export function loadCart(render){
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load', ()=>{
        console.log(xhr.response);
        render();
    });
  
    xhr.open('GET','https://supersimplebackend.dev/cart');
    xhr.send();
}
*/
