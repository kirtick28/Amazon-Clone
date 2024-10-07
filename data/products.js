import { formatCurrency } from "../scripts/utils/money.js";

// Used to Get the product
export function getProduct(productId){
  let matchingProduct;
  products.forEach(product => {
    if(product.id == productId){
      matchingProduct = product;
    }
  })
  return matchingProduct;
}

// Product class - Parent Class
class Product{
  id;
  image;
  name;
  rating;
  priceCents;

  // Constructor which initializes the properties of Product
  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  // Used to get the stars url
  getStarsURl(){
    return `images/ratings/rating-${this.rating.stars*10}.png`
  }

  // Used to get the rating count
  getRatingCount(){
    return this.rating.count;
  }

  // Used to get the formatted price
  getPrice(){
    return `$${formatCurrency(this.priceCents)}`
  }

  // Extra info of this class
  extraInfoHtml(){
    return '';
  }
}

// Derived class from product 
class Clothing extends Product{
  sizeChartLink;
  
  // Constructor which initializes the sizeChartLink and also calls the super (parent) class constructor as well
  constructor(productDetails){
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  // Overrided method - Extra info of this class
  extraInfoHtml(){
    return `
    <a href="${this.sizeChartLink}" target="_blank">Size Chart</a>
    `;
  }
}

// Another derived class from product
class Appliance extends Product{
  instructionsLink;
  warrantyLink;

  // Constructor which initializes the instructionsLink, warrantyLink and also calls the super (parent) class constructor as well
  constructor(productDetails){
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  // overrided method - Extra info of this class
  extraInfoHtml(){
    return `
      <a href="${this.instructionsLink}" target="_blank">Instructions</a>
      <a href="${this.warrantyLink}" target="_blank">Warranty</a>
    `;
  }
}



//Creation of list of objects by getting the product's data from supersimplebackend server using XMLHttpRequest
export let products = [];

export async function loadProductsFetch(){
  let productsData;
  try{
    const response = await fetch('https://supersimplebackend.dev/products/');
    productsData = await response.json()
  }catch(error){
    console.error('Failed to load Products: ',error);
  }
  products = productsData.map((productDetails) =>{
    if(productDetails.type === 'clothing'){
      return new Clothing(productDetails);
    }
    if(productDetails.type === 'appliance'){
      return new Appliance(productDetails);
    }
    return new Product(productDetails);
  });
  console.log('Products loaded successfully');
}
  

export function loadProducts(func){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load',()=>{
    products = JSON.parse(xhr.response).map((productDetails) =>{
      if(productDetails.type === 'clothing'){
        return new Clothing(productDetails);
      }
      if(productDetails.type === 'appliance'){
        return new Appliance(productDetails);
      }
      return new Product(productDetails);
    });
    func();
  })

  xhr.addEventListener('error', (error)=>{
    console.log(`Unexpected error : ${error}`);
  })

  xhr.open('GET','https://supersimplebackend.dev/products/');
  xhr.send();
}

