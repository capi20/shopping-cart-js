import { createRootElement } from './helper'

class Header extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const header = createRootElement("header", "header")
        header.innerHTML = `
            <a href="/"><img src="/static/images/logo.png" alt="logo" class="header__logo"/></a>
            <nav class="header__nav">
                <div class="header__nav-left">
                    <a href="/" class="header__nav-link">Home</a>
                    <a href="/products" class="header__nav-link product-link">Products</a>
                </div>
                <div class="header__nav-right">
                    <div class="mb-2">
                        <a href="/signin" class="header__nav-link">SignIn</a>
                        <a href="/register" class="header__nav-link">Register</a>
                    </div>
                    <div class="cart" id="cart-logo">
                        <img src="/static/images/cart.svg" alt="cart logo" class="cart__logo"/>
                        <span class="cart__count">0 items</span>
                    </div>
                </div>
            </nav>
        `
        header.querySelector('.product-link').addEventListener('click', 
            () => sessionStorage.removeItem('currentCategoryId'))
        this.appendChild(header)
    }
}

customElements.define("header-element", Header)