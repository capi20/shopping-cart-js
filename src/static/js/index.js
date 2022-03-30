import Product from './Product'
import Sidebar from './Sidebar'
import Modal from './Modal'
import ShoppingCart from './ShoppingCart'
import ProductModal from './ProductModal'
import CategoryCard from './CategoryCard'
import Header from './Header'
import Footer from './Footer'
import Slider from './Slider'
import Form from './Form'

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
  cartData = {}

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

      new ProductModal(this.cartData, 
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

function addDOMElements() {
  App.init()
  console.log('rerendering')
  const mainContainer = document.querySelector('main')

  if (window.location.pathname === '/products') {
    mainContainer.setAttribute("class", "product__wrapper")

    mainContainer.append(new Sidebar(fetchData))

    const prodList = document.createElement('section')
    prodList.setAttribute("class", "products__list")
    prodList.setAttribute("id", "prod-list")

    mainContainer.append(prodList)

    const id = sessionStorage.getItem('currentProductId')
    fetchData('/products', id)
  } else if (window.location.pathname === '/') {
    fetchData('/')
  } else if (window.location.pathname === '/signin' || window.location.pathname === '/register') {
    const isRegister = window.location.pathname === '/register' ? true : false
    const heading = isRegister ? 'Signup' : 'Login'
    const description = isRegister ? "We do not share your personal details with anyone." : "Get access to your Orders, Wishlist and Recommendations"
    const formObj = isRegister ? signupForm : loginForm

    new Form(heading, description, formObj, mainContainer)
  }
  
}

async function fetchData(routeTo, id) {
  let response, products

  if (routeTo === '/') {
    response = await fetch(`http://localhost:3000/categorydata`)
    let categories = await response.json()

    const mainContainer = document.querySelector('main')
    mainContainer.setAttribute("class", "home")

    mainContainer.append(new Slider())

    for (let category of categories) {
      mainContainer.append(new CategoryCard(category, fetchData))
    }

    return
  } else if (routeTo === '/products') {

    if (id) {
      sessionStorage.setItem('currentProductId', id)
      response = await fetch(`http://localhost:3000/products/${id}`)
    } else {
      sessionStorage.removeItem('currentProductId')
      response = await fetch("http://localhost:3000/productdata");
    }

    if (window.location.pathname === '/') {
      window.location.href = `/products`
    }
    products = await response.json();
  
    displayProducts(products);
  }
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