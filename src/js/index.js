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

// class to create instances of ShoppingCart and Modal class so other classes can access their methods
class App {
  static cartData = {}
  static cartClicks = 0
  static cartClose = false
  static isCartChange = false

  static init() {
      // create ShoppingCart and Modal instances
      this.shoppingCart = new ShoppingCart()
      App.cartData = this.shoppingCart.state
      this.modal = new Modal(false)

      // Add modal inside dom
      document.querySelector('body').append(this.modal)

      // get items added in the cart from session storage
      const storedData = JSON.parse(sessionStorage.getItem("CartData"))
      if (storedData) {
        this.cartData = storedData
        this.shoppingCart.updateCartData(this.cartData)
      }
  }

  // open cart
  static openModal() {
    App.cartClicks = App.cartClicks + 1
    this.cartClose = false
    this.modal.open()

    const modal = document.querySelector('modal-element .modal-wrapper .modal')

    // Add elements inside modal only when user click on the cart logo for the first time
    if (App.cartClicks === 1) {
      addCartElements(modal, this.cartData)
    }

    // check if cart is not empty then render products inside modal
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

  // To add a product in the cart
  static addProductToCart(product) {
      if (App.cartClicks >= 1 && !this.modal.isOpen && !this.cartClose) {
        this.oldCartData = {...this.cartData, cart:{...this.cartData.cart}}
        this.cartClose = true
        this.isCartChange = true
      }
      this.cartData = this.shoppingCart.addProduct(product)
      return this.cartData
  }

  // remove a product from the cart
  static removeProductToCart(productId) {
      this.cartData = this.shoppingCart.removeProduct(productId)
      return this.cartData
  }
}

// This function will execute first
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

// To open cart by clicking on cart logo at the header
document.getElementById('cart-logo').addEventListener('click', App.openModal.bind(App))

window.addEventListener("DOMContentLoaded", init);