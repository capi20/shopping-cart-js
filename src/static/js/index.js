import Product from './Product'
import Sidebar from './Sidebar'
import Modal from './Modal'
import ShoppingCart from './ShoppingCart'

class App {
  static init() {
      this.cart = new ShoppingCart()
      this.modal = new Modal(false)
      document.querySelector('body').append(this.modal)
  }

  static openModal() {
    this.modal.open()
  }

  static addProductToCart(product) {
      this.cart.addProduct(product)
  }
}

async function fetchProducts() {
  App.init()
  let response = await fetch("http://localhost:3000/productdata");
  let products = await response.json();
  displayProducts(products);
}

function displayProducts(products) {
    for(const product of products) {
        new Product(product, App.addProductToCart.bind(App), 'prod-list')
    }
}

document.getElementById('cart-logo').addEventListener('click', App.openModal.bind(App))

window.addEventListener("DOMContentLoaded", fetchProducts);