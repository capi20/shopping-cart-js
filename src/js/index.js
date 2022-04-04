import Sidebar from './components/Sidebar'
import Modal from './components/Modal'
import ShoppingCart from './ShoppingCart'
import CartProduct from './CartProduct'
import Header from './components/Header'
import Footer from './components/Footer'
import Slider from './components/Slider'

import loadAuthPage from './pages/authPage'
import loadHomePage from './pages/homePage'
import loadProductPage from './pages/productPage'
import { addCartElements, updateCartElements } from './pages/cartPage'

class App {
  static cartData = {}
  static cartClicks = 0
  static cartClose = false
  static isCartChange = false

  static init() {
      this.shoppingCart = new ShoppingCart()
      App.cartData = this.shoppingCart.state
      this.modal = new Modal(false)
      document.querySelector('body').append(this.modal)

      const storedData = JSON.parse(sessionStorage.getItem("CartData"))
      if (storedData) {
        this.cartData = storedData
        this.shoppingCart.updateCartData(this.cartData)
      }
  }

  static openModal() {
    App.cartClicks = App.cartClicks + 1
    this.cartClose = false
    this.modal.open()

    const modal = document.querySelector('modal-element .modal-wrapper .modal')

    if (App.cartClicks === 1) {
      addCartElements(modal, this.cartData)
    }

    if (this.cartData.count > 0) {

      if (this.isCartChange) {
        updateCartElements(modal, this.cartData)
        this.isCartChange = false
      }

      const hookNode = modal.querySelector('.modal__middle .cart')

      new CartProduct(this.oldCartData,
        this.cartData, 
        App.addProductToCart.bind(App), 
        App.removeProductToCart.bind(App),
        updateCartElements,
        hookNode,
        modal)
    }
  }

  static addProductToCart(product) {
      if (App.cartClicks >= 1 && !this.modal.isOpen && !this.cartClose) {
        this.oldCartData = {...this.cartData, cart:{...this.cartData.cart}}
        this.cartClose = true
        this.isCartChange = true
      }
      this.cartData = this.shoppingCart.addProduct(product)
      return this.cartData
  }

  static removeProductToCart(productId) {
      this.cartData = this.shoppingCart.removeProduct(productId)
      return this.cartData
  }
}

function init() {
  App.init()

  if (window.location.pathname === '/') {
    loadHomePage()
  } else if (window.location.pathname === '/products') {
    const id = sessionStorage.getItem('currentCategoryId')
    loadProductPage(id, App.addProductToCart.bind(App))
  } 
  else {
    loadAuthPage()
  }
}

document.getElementById('cart-logo').addEventListener('click', App.openModal.bind(App))

window.addEventListener("DOMContentLoaded", init);