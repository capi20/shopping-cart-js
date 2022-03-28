import Product from './Product'
import Sidebar from './Sidebar'

async function fetchProducts() {
  let response = await fetch("http://localhost:3000/products");
  let products = await response.json();
    //  console.log(products);
  displayProducts(products);
}

function displayProducts(products) {
    for(const product of products) {
        new Product(product, 'prod-list')
    }
}

window.addEventListener("DOMContentLoaded", fetchProducts);