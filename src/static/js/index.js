import Product from './Product'
import Sidebar from './Sidebar'
import Modal from './Modal'
import ShoppingCart from './ShoppingCart'
import ProductModal from './ProductModal'

class App {
  cartItems = {}

  static init() {
      this.cart = new ShoppingCart()
      this.modal = new Modal(false)
      document.querySelector('body').append(this.modal)
  }

  static openModal() {
    this.modal.open()

    if (this.cartItems) {
      const modal = document.querySelector('modal-element .modal-wrapper .modal .modal__middle')
      modal.innerHTML = ''

      Object.keys(this.cartItems.cart).map(item => {
        new ProductModal(this.cartItems.cart[item], 
          App.addProductToCart.bind(App), 
          App.removeProductToCart.bind(App),
          modal)
      })
    }
  }

  static addProductToCart(product) {
      this.cartItems = this.cart.addProduct(product)
  }

  static removeProductToCart(productId) {
      this.cartItems = this.cart.removeProduct(productId)
  }
}

async function fetchProducts() {
  App.init()
  let response = await fetch("http://localhost:3000/productdata");
  let products = await response.json();
  displayProducts(products);
}

function displayProducts(products) {
  const prodList = document.getElementById('prod-list')
    for(const product of products) {
        new Product(product, App.addProductToCart.bind(App), prodList)
    }
}

document.getElementById('cart-logo').addEventListener('click', App.openModal.bind(App))

window.addEventListener("DOMContentLoaded", fetchProducts);