import ButtonComponent from './components/ButtonComponent'
import { createRootElement } from './helper'
 
export default class CartProduct {

    constructor(oldCartData, cartData, addProductToCart, removeProductToCart, updateCartElements, hookNode, modal) {
        this.oldCartData = oldCartData
        this.cartData = cartData
        this.productList = this.cartData.cart
        this.addProductToCart = addProductToCart
        this.removeProductToCart = removeProductToCart
        this.updateCartElements = updateCartElements
        this.hookNode = hookNode
        this.modal = modal
        this.render()
    }

    // To render new added products or modify info for existing products
    render() {
        const cartContainer = this.hookNode.querySelector(".cart-wrapper")

        Object.keys(this.productList).map(el => {
            const currentEl = document.getElementById(el)
            if (!currentEl) {
                this.productRender(this.productList[el], cartContainer)
            } else if (currentEl && this.oldCartData && this.oldCartData.cart[el]) {
                if (this.oldCartData.cart[el].itemCount !== this.productList[el].itemCount) {
                    this.updateCartProductData(el)
                } 
            } else {
                return
            }
        })
    }

    // After add/remove product -- To update count and amount for each product
    updateCartProductData(prodId) {
        const updatedProductEl = document.getElementById(prodId)
        const updatedProductData = this.cartData.cart[prodId]

        if (updatedProductData) {
            updatedProductEl.querySelector('.product-count').textContent = `${updatedProductData.itemCount}`
            updatedProductEl.querySelector('.product-total-amount').textContent = `Rs.${updatedProductData.price * updatedProductData.itemCount}`
        } else {
            updatedProductEl.remove()
        }
    }

    // To update cart info 
    updateCartData(prodId) {
        this.updateCartProductData(prodId)
        this.updateCartElements(this.modal, this.cartData)
    }

    // create a product element and render it inside cart
    productRender(prod, cartContainer) {
        let productItem = createRootElement("div", "cart-item", cartContainer, 
            [{name: "id", value: `${prod.id}`}]);
        productItem.innerHTML = `
            <img src=${prod.imageURL} alt=${prod.name} class="cart-item__image"/>
            <div class="cart-item__right">
                <h4  class="cart-item__name mb-2">${prod.name}</h4>
                <div class="cart-item__right-bottom">
                    <div class="cart-item__right-bottom--left">
                        <button-element 
                            text="-" 
                            classes="p-small br-circle"></button-element>
                        <span class="product-count">${prod.itemCount}</span>
                        <button-element 
                            text="+" 
                            classes="p-small br-circle"></button-element>
                        <span>x ${prod.price}</span>    
                    </div>  
                    <span class="product-total-amount">Rs.${prod.price * prod.itemCount}</span>
                </div>
            </div>
        `

        const btns = productItem.querySelectorAll("button-element button")
        btns[0].addEventListener('click', () => {
            this.cartData = this.removeProductToCart(prod.id)
            this.productList = this.cartData.cart
            this.updateCartData(prod.id)
        })
        btns[1].addEventListener('click', () => {
            this.cartData = this.addProductToCart(prod)
            this.productList = this.cartData.cart
            this.updateCartData(prod.id)
        })
    }
}