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

            Object.keys(this.productList).map(el => {
                this.elementRender(this.productList[el])
            })
        }

        if (this.cartData.count > 0) {
            const offerWrapper = this.hookNode.querySelector('.offer-wrapper')

            if(!offerWrapper) {
                const offer = createRootElement("div", "offer-wrapper", this.hookNode)
                offer.innerHTML = `
                <img src="/static/images/lowest-price.png" alt="Offer"/>
                <span>You won't find it cheaper anywhere</span>
                `
            }
        }

        this.updateCartInfo()
    }

    clearCart = () => {
        this.hookNode.innerHTML = ''
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

        this.parentEl.querySelector('.modal__top h3').textContent = `${this.cartData.count} items`

        const btnText = this.cartData.count > 0 && this.cartData ? 
            `<div class="d-flex justify-content-between">
                <span>Proceed to Checkout</span>
                <span>Rs.${this.cartData.amount}</span>
            </div>` :
            "Start shopping"

        const bottomElement = this.cartData.count > 0 && this.cartData ? 
            `<p class="mb-2 text-center">Promo code can be applied on payment page</p>
            <button-element text='' classes="w-100"></button-element>` : 
            `<button-element text='' classes="w-100"></button-element>
            `
        this.parentEl.querySelector('.modal__bottom').innerHTML = bottomElement
        this.parentEl.querySelector('.modal__bottom button-element button').innerHTML = btnText
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