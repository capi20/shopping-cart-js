import ButtonComponent from './components/ButtonComponent'
import { createRootElement } from './helper'

export default class CartElement {

    constructor(cartData, addProductToCart, removeProductToCart, hookNode, parentEl) {
        this.cartData = cartData
        this.productList = this.cartData.cart
        this.addProductToCart = addProductToCart
        this.removeProductToCart = removeProductToCart
        this.hookNode = hookNode
        this.parentEl = parentEl
        this.render()
    }

    render() {
        if (this.productList) {
            this.clearCart()
        }

        Object.keys(this.productList).map(el => {
            this.elementRender(this.productList[el])
        })

        this.updateCartInfo()
    }

    clearCart = () => {
        const removeProducts = this.hookNode.querySelectorAll('.cartElement')
        for (let eachNode of removeProducts) {
            eachNode.parentNode.removeChild(eachNode)
        }
    }

    updateCartInfo = () => {
        if(this.cartData.count === 0) {
            this.hookNode.innerHTML = `
                <div class="modal__emptyMsg">
                    <h3 class="mb-3">No items in your cart</h3>
                    <p>Your favourite items are just a click away</p> 
                </div>
            `
        }

        this.parentEl.querySelector('.modal__top h4').textContent = `${this.cartData.count} items`

        const buttonText = this.cartData.count > 0 && this.cartData ? 
            `<div class="d-flex justify-content-between">
                <span>Proceed to Checkout</span>
                <span>Rs.${this.cartData.amount}</span>
            </div>` : 
            `<span>Start shopping</span>`
        this.parentEl.querySelector('.modal__bottom button-element button').innerHTML = buttonText
    }

    elementRender(prod) {
        let productItem = createRootElement("div", "cartElement", this.hookNode);
        productItem.innerHTML = `
            <img src=${prod.imageURL} alt=${prod.name} class="cartElement__image"/>
            <div class="cartElement__right">
                <h4  class="cartElement__name mb-2">${prod.name}</h4>
                <div class="cartElement__right-bottom">
                    <div class="cartElement__right-bottom--left">
                        <button-element 
                            text="-" 
                            classes="p-small br-circle"></button-element>
                        <span>${prod.itemCount}</span>
                        <button-element 
                            text="+" 
                            classes="p-small br-circle"></button-element>
                        <span>x ${prod.price}</span>    
                    </div>  
                    <span>Rs.${prod.price * prod.itemCount}</span>
                </div>
            </div>
        `
        
        const btns = productItem.querySelectorAll("button-element button")
        btns[0].addEventListener('click', () => {
            this.cartData = this.removeProductToCart(prod.id)
            this.productList = this.cartData.cart
            this.render()
        })
        btns[1].addEventListener('click', () => {
            this.cartData = this.addProductToCart(prod)
            this.productList = this.cartData.cart
            this.render()
        })
    }
}