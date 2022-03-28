import Product from './Product'
import Sidebar from './Sidebar'
import ShoppingCart from './ShoppingCart'

class App {
  static init() {
      this.cart = new ShoppingCart()
      console.log('App instance')
  }

  static addProductToCart(product) {
      this.cart.addProduct(product)
  }
}

async function fetchProducts() {
  App.init()
  let response = await fetch("http://localhost:3000/products");
  let products = await response.json();
    //  console.log(products);
  displayProducts(products);
}

function displayProducts(products) {
    for(const product of products) {
        new Product(product, App.addProductToCart.bind(App), 'prod-list')
    }
}

// class Shop {
//   constructor() {
//       this.render()
//   }
//   render() {
//       this.cart = new ShoppingCart('app')
//       new ProductList('app')
//   }
// }

window.addEventListener("DOMContentLoaded", fetchProducts);