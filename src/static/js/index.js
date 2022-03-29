import Product from './Product'
import Sidebar from './Sidebar'
import Modal from './Modal'
import ShoppingCart from './ShoppingCart'
import ProductModal from './ProductModal'

class App {
  cartData = {}

  static init() {
      this.cart = new ShoppingCart()
      this.modal = new Modal(false)
      document.querySelector('body').append(this.modal)
  }

  static openModal() {
    this.modal.open()

    if (this.cartData) {
      const hookNode = document.querySelector('modal-element .modal-wrapper .modal .modal__middle')
      const parentEl = document.querySelector('modal-element .modal-wrapper .modal')
      hookNode.innerHTML = ''

      new ProductModal(this.cartData, 
        App.addProductToCart.bind(App), 
        App.removeProductToCart.bind(App),
        hookNode,
        parentEl)
    }
  }

  static addProductToCart(product) {
      this.cartData = this.cart.addProduct(product)
      return this.cartData
  }

  static removeProductToCart(productId) {
      this.cartData = this.cart.removeProduct(productId)
      return this.cartData
  }
}

function addDOMElements() {
  App.init()
  const mainContainer = document.querySelector('main')
  mainContainer.setAttribute("class", "product__wrapper")

  mainContainer.append(new Sidebar(fetchProducts))

  const prodList = document.createElement('section')
  prodList.setAttribute("class", "products__list")
  prodList.setAttribute("id", "prod-list")

  mainContainer.append(prodList)

  fetchProducts()
}

async function fetchProducts(id) {
  let response, products

  if (id) {
    response = await fetch(`http://localhost:3000/products/${id}`)
  } else {
    response = await fetch("http://localhost:3000/productdata");
  }
  products = await response.json();

  displayProducts(products);
}

function displayProducts(products) {
  const prodList = document.getElementById('prod-list')
  prodList.innerHTML = ''

    for(const product of products) {
        new Product(product, App.addProductToCart.bind(App), prodList)
    }
}

document.getElementById('cart-logo').addEventListener('click', App.openModal.bind(App))

window.addEventListener("DOMContentLoaded", addDOMElements);