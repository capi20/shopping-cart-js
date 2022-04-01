import Product from './Product'
import Sidebar from './components/Sidebar'
import Modal from './components/Modal'
import ShoppingCart from './ShoppingCart'
import CartElement from './CartElement'
import CategoryCard from './CategoryCard'
import Header from './components/Header'
import Footer from './components/Footer'
import Slider from './components/Slider'
import Form from './Form'
import { createRootElement } from './helper'

const loginForm=[
  {
      label:"Email"
  },
  {
      label:"Password",
      type: "password"
  }
]

const signupForm = [
  {
      label: "First Name",
  },
  {
      label: "Last Name",
  },
  ...loginForm,
  {
      label: "Confirm Password",
      type: "password"
  }
]

class App {
  static cartData = {
    cart:{},
    amount:0,
    count:0,
  }

  static init() {
      this.cart = new ShoppingCart()
      this.modal = new Modal(false)
      document.querySelector('body').append(this.modal)

      const storedData = JSON.parse(sessionStorage.getItem("CartData"))
      if (storedData) {
        this.cartData = storedData
      }
      this.cart.updateCart(this.cartData)
  }

  static openModal() {
    this.modal.open()

    if (this.cartData) {
      const hookNode = document.querySelector('modal-element .modal-wrapper .modal .modal__middle')
      const parentEl = document.querySelector('modal-element .modal-wrapper .modal')
      hookNode.innerHTML = ''

      new CartElement(this.cartData, 
        App.addProductToCart.bind(App), 
        App.removeProductToCart.bind(App),
        hookNode,
        parentEl)
    }
  }

  static addProductToCart(product) {
      this.cartData = this.cart.addProduct(product)
      sessionStorage.setItem("CartData", JSON.stringify(this.cartData))
      return this.cartData
  }

  static removeProductToCart(productId) {
      this.cartData = this.cart.removeProduct(productId)
      sessionStorage.setItem("CartData", JSON.stringify(this.cartData))
      return this.cartData
  }
}

function updateDOMElements() {
  App.init()
  
  const mainContainer = document.querySelector('main')

  if (window.location.pathname === '/') {
    mainContainer.setAttribute("class", "home")

    mainContainer.append(new Slider())

    fetchData('/')
  } else if (window.location.pathname === '/products') {
    mainContainer.setAttribute("class", "product__wrapper")

    mainContainer.append(new Sidebar(fetchData))

    const productList = document.createElement('section')
    productList.setAttribute("class", "products__list")
    productList.setAttribute("id", "prod-list")

    mainContainer.append(productList)

    const id = sessionStorage.getItem('currentCategoryId')
    fetchData('/products', id)
  } else if (window.location.pathname === '/signin' || window.location.pathname === '/register') {
    const isRegister = window.location.pathname === '/register' ? true : false
    const heading = isRegister ? 'Signup' : 'Login'
    const description = isRegister ? "We do not share your personal details with anyone." : "Get access to your Orders, Wishlist and Recommendations"
    const formObj = isRegister ? signupForm : loginForm

    new Form(heading, description, formObj, mainContainer)
  }
  
}

async function fetchData(routeTo, id) {
  let response, result

  if (routeTo === '/') {
    response = await fetch(`/categorydata`)
    result = await response.json()

    displayCategories(result)
  } else if (routeTo === '/products') {

    if (id) {
      sessionStorage.setItem('currentCategoryId', id)
      response = await fetch(`/products/${id}`)
    } else {
      sessionStorage.removeItem('currentCategoryId')
      response = await fetch("/productdata");
    }

    result = await response.json();
  
    displayProducts(result);
  }
}

function displayCategories(categories) {
  const container = document.querySelector('main')

  for (let category of categories) {
    new CategoryCard(category, fetchData, container)
  }
}


function displayProducts(products) {
  const prodContainer = document.getElementById('prod-list')
  prodContainer.innerHTML = ''

  for(let product of products) {
    new Product(product, App.addProductToCart.bind(App), prodContainer)
  }
}

document.getElementById('cart-logo').addEventListener('click', App.openModal.bind(App))

window.addEventListener("DOMContentLoaded", updateDOMElements);