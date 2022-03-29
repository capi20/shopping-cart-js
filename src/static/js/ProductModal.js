import ButtonComponent from './ButtonComponent'
import { Component } from './helper'

export default class Product extends Component {

    constructor(product, addProductToCart, removeProductToCart, renderHookId) {
        super(renderHookId)
        this.product = product
        this.addProductToCart = addProductToCart
        this.removeProductToCart = removeProductToCart
        this.render()
    }

    addToCart() {
        this.addProductToCart(this.product)
    }

    render() {
        let productItem = this.createRootElement("div", "productRow");
        productItem.innerHTML = `
            <img src=${this.product.imageURL} alt=${this.product.name} class="productRow__image"/>
            <div class="productRow__right">
                <h4  class="productRow__name mb-2">${this.product.name}</h4>
                <div class="productRow__right-bottom">
                    <div class="productRow__right-bottom--left">
                        <button-element 
                            text="-" 
                            classes="p-small br-circle"></button-element>
                        <span>${this.product.itemCount}</span>
                        <button-element 
                            text="+" 
                            classes="p-small br-circle"></button-element>
                        <span>x ${this.product.price}</span>    
                    </div>  
                    <span>Rs.${this.product.price * this.product.itemCount}</span>
                </div>
            </div>
        `
    }
}